import zod from "zod";
import { MONGO_OBJECT_ID_REGEX } from "./shared.js";

export const GetPostsSchema = zod.object({
  userId: zod.string().optional(),
});

export const AddPostSchema = zod.object({
  post: zod.string(),
  userId: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid userId"),
});

export const GetPostSchema = zod.object({
  postId: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid postId"),
});

export const UpdatePostSchema = zod.object({
  postId: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid postId"),
  post: zod.string(),
});

export const DeletePostSchema = zod.object({
  postId: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid postId"),
});

export type GetPostsParams = zod.infer<typeof GetPostsSchema>;
export type AddPostsParams = zod.infer<typeof AddPostSchema>;
export type GetPostParams = zod.infer<typeof GetPostSchema>;
export type UpdatePostParams = zod.infer<typeof UpdatePostSchema>;
export type DeletePostParams = zod.infer<typeof DeletePostSchema>;