import "express";
import mongoose from "mongoose";

export interface UserData {
  userId: string;
  username: string;
  email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user: UserData;
  }
}
