import mongoose, { Types, Schema } from "mongoose";
import type { PostType } from "./posts.type.js";

const postSchema = new mongoose.Schema<PostType>({
  post: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Post", postSchema);
