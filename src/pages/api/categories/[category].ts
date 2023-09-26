import { ensureDbConnected } from "@/lib/db";
import { Product } from "@/lib/model/product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  if (req.method === "GET") {
    try {
      const { sortBy, type } = req.query;
      const sortType = type === "desc" ? -1 : 1;

      await ensureDbConnected();

      // Use a more descriptive variable name for the query
      const productsByCategoryQuery = Product.find({ category });

      if (sortBy === "price") {
        productsByCategoryQuery.sort({ price: sortType });
      }

      const productsByCategory = await productsByCategoryQuery.exec();

      // Check if the result is empty or not found
      if (!productsByCategory || productsByCategory.length === 0) {
        return res
          .status(404)
          .json({ error: "Products not found for this category" });
      }

      return res.status(200).json(productsByCategory);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ error: "Method Not Allowed" });
}
