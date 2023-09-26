import mongoose from "mongoose";

let isdbConnected: Boolean = false;

export async function ensureDbConnected() {
  if (!process.env.MONGO_URL) {
    return;
  }
  if (isdbConnected) return;
  isdbConnected = true;
  await mongoose
    .connect(process.env.MONGO_URL, { dbName: "chakra" })
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));
}
