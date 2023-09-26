import { ensureDbConnected } from "@/lib/db";
import { Product } from "@/lib/model/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await ensureDbConnected();

      const { sortBy, type } = req.query;
      const sortType = type === "desc" ? -1 : 1;

      const query = Product.find();

      if (sortBy === "price") {
        query.sort({ price: sortType });
      }

      const products = await query.exec();

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
