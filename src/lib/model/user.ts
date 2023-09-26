import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    index: true,
  },
  password: String,
  name: String,
  role: String,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
