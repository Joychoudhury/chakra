import { ensureDbConnected } from "@/lib/db";
import { Cart } from "@/lib/model/cart";
import { User } from "@/lib/model/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

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

    if (req.method === "PUT") {
      // Update cart logic here
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $set: { "products.$[elem].quantity": req.body.value } },
        {
          new: true,
          arrayFilters: [{ "elem.productId": id }],
        }
      ).populate("products.productId");

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      return res.status(200).json(cart);
    } else if (req.method === "DELETE") {
      // Delete product from cart logic here
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId: id } } },
        { new: true }
      ).populate("products.productId");

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      return res.status(200).json(cart);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
