import { ensureDbConnected } from "@/lib/db";
import { Product } from "@/lib/model/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      await ensureDbConnected();
      const product = await Product.findById(id).exec();

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ error: "Method Not Allowed" });
}
