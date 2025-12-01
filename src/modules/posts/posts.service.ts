import type { HydratedDocument } from "mongoose";
import type { PostFilters, PostType } from "./posts.type.js";
import Post from "./posts.model.js";
import { NotFoundError } from "../../core/errors/HttpError.js";
import createDebug from "debug";

const debug = createDebug("app:posts:controller");

export async function getPosts(
  filters: PostFilters
): Promise<HydratedDocument<PostType>[]> {
  debug("filters applied:", JSON.stringify(filters));
  let query = Post.find();

  if (filters.userId) {
    query = query.where({ author: filters.userId });
  }

  if (filters?.id) {
    query = query.where({ _id: filters.id });
  }

  const posts = await query.populate("author", "username");
  debug("posts found:", posts);
  return posts;
}

export async function addPost(
  userId: string,
  post: string
): Promise<HydratedDocument<PostType>> {
  const createdPost = new Post({
    author: userId,
    post,
  });
  await createdPost.save();
  return createdPost;
}

export async function updatePost(
  userId: string,
  id: string,
  post: string
): Promise<HydratedDocument<PostType>> {
  const matchingPost = await Post.findOne({ _id: id, author: userId });
  if (!matchingPost) throw new NotFoundError("post not found or owned by user");
  matchingPost.post = post;
  return await matchingPost.save();
}

export async function deletePost(
  userId: string,
  id: string
): Promise<HydratedDocument<PostType>> {
  const post = await Post.findOneAndDelete({ _id: id, author: userId });

  if (!post) {
    throw new NotFoundError("post not found or not owned by user");
  }

  return post;
}
