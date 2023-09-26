import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/db";

import { User } from "@/lib/model/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, name, role } = req.body;
    if (email === "" || password === "" || name === "") {
      console.log("error");
      return res.status(400).json({ msg: "Credentials are required." });
    }

    await ensureDbConnected();
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(404).json({ msg: "User already exists" });
    }

    let newUser = new User({ email, password, name, role });
    await newUser.save();
    res.status(200).json({ msg: "User created succesfully" });
  } else {
    return res.status(405).end();
  }
}
