import mongoose from "mongoose";

export type PostType = {
  post: string;
  author: mongoose.Types.ObjectId;
};

export type PostFilters = {
  id?: string;
  userId: string;
};
