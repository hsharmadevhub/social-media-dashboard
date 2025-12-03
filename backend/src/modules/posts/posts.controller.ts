import type { Request, Response } from "express";
import { addPost, deletePost, getPosts, updatePost } from "./posts.service.js";
import type {
  AddPostParams,
  DeletePostRouteParams,
  GetPostRouteParams,
  UpdatePostBodyParams,
  UpdatePostRouteParams,
} from "./validators/posts.zod.js";
import createDebug from "debug";

const debug = createDebug("app:posts:controller");

export async function getPostsController(req: Request, res: Response) {
  const posts = await getPosts({ userId: req.user.userId });
  return res.status(200).json({ posts });
}

export async function addPostController(
  req: Request<{}, {}, AddPostParams>,
  res: Response
) {
  debug("request body:", JSON.stringify(req.body));
  const createdPost = await addPost(req.user.userId, req.body.post);
  return res
    .status(201)
    .json({ message: "post created successfully", post: createdPost });
}

export async function getPostController(
  req: Request<GetPostRouteParams, {}, {}>,
  res: Response
) {
  debug("request params:", JSON.stringify(req.params));
  const [post] = await getPosts({
    userId: req.user.userId,
    id: req.params.id,
  });
  return res.status(200).json({ post });
}

export async function updatePostController(
  req: Request<UpdatePostRouteParams, {}, UpdatePostBodyParams>,
  res: Response
) {
  debug("request params:", JSON.stringify(req.params));
  debug("request body:", JSON.stringify(req.body));
  const updatedPost = await updatePost(
    req.user.userId,
    req.params.id,
    req.body.post
  );
  return res
    .status(200)
    .json({ message: "post updated successfully", updatedPost });
}

export async function deletePostController(
  req: Request<DeletePostRouteParams>,
  res: Response
) {
  debug("request params:", JSON.stringify(req.params));
  const deletedPost = await deletePost(req.user.userId, req.params.id);
  return res
    .status(200)
    .json({ message: "post deleted successfully", deletedPost });
}
