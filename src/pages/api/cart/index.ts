import { ensureDbConnected } from "@/lib/db";
import { Cart } from "@/lib/model/cart";
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { User } from "@/lib/model/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "GET") {
    try {
      await ensureDbConnected();

      const { email } = session.user;
      const isUser = await User.findOne({ email });

      if (isUser == null) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      const userId = isUser._id;

      // Find the cart document for the user
      const cart = await Cart.findOne({ userId }).populate({
        path: "products.productId",
        model: "Product", // Replace 'Product' with the actual name of your Product model
      });

      if (!cart) {
        // If the cart doesn't exist, create a new one
        const newCart = new Cart({ userId });
        await newCart.save();
        res.status(200).json(newCart);
      } else {
        res.status(200).json(cart);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      await ensureDbConnected();

      const { email, id } = req.body;
      const isUser = await User.findOne({ email });

      if (isUser == null) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      const userId = isUser._id;

      // Find the cart document for the user
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        // If the cart doesn't exist, create a new one
        cart = new Cart({ userId });
      }

      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(
        (product: { productId: string; quantity: number }) =>
          product.productId == id
      );
      if (existingProduct) {
        // If the product exists, increase the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product doesn't exist, add it to the products array
        cart.products.push({ productId: id, quantity: 1 });
      }

      // Save the updated cart
      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
