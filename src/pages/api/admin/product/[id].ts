import { ensureDbConnected } from "@/lib/db";
import { Product } from "@/lib/model/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method == "GET") {
    try {
      await ensureDbConnected();

      // Convert the id to a valid ObjectId

      // Find the product by ID and update it
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "PUT") {
    // PUT request for updating product fields
    try {
      await ensureDbConnected();

      // Find the product by ID and update it
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await ensureDbConnected();

      // Find the product by ID and update it
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
