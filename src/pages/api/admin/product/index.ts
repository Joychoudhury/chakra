import { ensureDbConnected } from "@/lib/db";
import { Product } from "@/lib/model/product";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { User } from "@/lib/model/user";

// Helper function to handle errors
const handleError = (res: NextApiResponse, status: number, message: string) => {
  res.status(status).json({ error: message });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user || session.user.role !== "seller") {
      return handleError(res, 401, "You must be logged in as a seller.");
    }

    await ensureDbConnected();

    const { email } = session.user;
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return handleError(res, 400, "User not found");
    }

    if (req.method === "GET") {
      const products = await Product.find({ userId: isUser._id });
      res.status(200).json(products);
    } else if (req.method === "POST") {
      const {
        title,
        offerPrice,
        originalPrice,
        description,
        imageSrc,
        category,
      } = req.body;
      // Validate the data
      if (
        !title ||
        !offerPrice ||
        !originalPrice ||
        !description ||
        !imageSrc ||
        !category
      ) {
        console.log(req.body);
        return handleError(res, 400, "Missing required fields");
      }
      console.log(isUser);

      const newProduct = new Product({
        title,
        offerPrice,
        originalPrice,
        description,
        imageSrc,
        category,
        userId: isUser._id,
      });

      await newProduct.save();
      res.status(200).json(newProduct);
    } else {
      handleError(res, 405, "Method Not Allowed");
    }
  } catch (error) {
    console.error("Error:", error);
    handleError(res, 500, "Internal Server Error");
  }
}
