import { ensureDbConnected } from "@/lib/db";
import { Cart } from "@/lib/model/cart";
import { User } from "@/lib/model/user";
import { Order } from "@/lib/model/order"; // Import the Order model
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

interface Cart {
  productId: {
    _id: string;
    imageSrc: string;
    offerPrice: number;
    originalPrice: number;
    title: string;
    description: string;
    category: string;
  };
  quantity: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  const { email } = session.user;
  const isUser = await User.findOne({ email });

  if (!isUser) {
    return res.status(400).json({ error: "User not found" });
  }

  const userId = isUser._id;

  try {
    await ensureDbConnected();

    if (req.method === "GET") {
      // Query all orders and populate product details
      const orders = await Order.find({ userId })
        .populate("products.productId")
        .sort({ date: -1 }); // Sort orders by date in descending order

      return res.status(200).json(orders);
    }
    if (req.method === "POST") {
      // Get the user's cart
      const cart = await Cart.findOne({ userId }).populate(
        "products.productId"
      );

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Calculate the total order amount
      const totalAmount = cart.products.reduce(
        (total: number, product: Cart) => {
          return total + product.productId.originalPrice * product.quantity;
        },
        0
      );
      console.log(totalAmount);
      // Create a new order
      const newOrder = new Order({
        userId,
        date: new Date(),
        products: cart.products.map((cartItem: Cart) => ({
          productId: cartItem.productId._id,
          quantity: cartItem.quantity,
        })),
        totalAmount,
      });
      console.log(newOrder);

      // Save the order to the database
      await newOrder.save();

      // Delete the user's cart
      await Cart.findOneAndDelete({ userId });

      return res.status(201).json(newOrder);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
