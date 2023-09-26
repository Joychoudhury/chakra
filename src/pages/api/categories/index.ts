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

      // Use a more descriptive variable name for the query
      const distinctCategoriesQuery = Product.distinct("category");
      const distinctCategories = await distinctCategoriesQuery.exec();

      // Check if the result is empty or not found
      if (!distinctCategories || distinctCategories.length === 0) {
        return res.status(404).json({ error: "Categories not found" });
      }

      return res.status(200).json(distinctCategories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ error: "Method Not Allowed" });
}
