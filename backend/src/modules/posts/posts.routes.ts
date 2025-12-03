import express from "express";
import {
  addPostController,
  deletePostController,
  getPostController,
  getPostsController,
  updatePostController,
} from "./posts.controller.js";
import {
  AddPostSchema,
  DeletePostSchemaRouteParams,
  GetPostSchemaRouteParams,
  UpdatePostSchemaBodyParams,
  UpdatePostSchemaRouteParams,
} from "./validators/posts.zod.js";
import validate from "../../core/middleware/validate.js";

const postRoutes = express.Router();

postRoutes.get("", getPostsController);
postRoutes.post("", validate({ body: AddPostSchema }), addPostController);
postRoutes.get(
  "/:id",
  validate({ params: GetPostSchemaRouteParams }),
  getPostController
);
postRoutes.put(
  "/:id",
  validate({
    params: UpdatePostSchemaRouteParams,
    body: UpdatePostSchemaBodyParams,
  }),
  updatePostController
);
postRoutes.delete(
  "/:id",
  validate({ params: DeletePostSchemaRouteParams }),
  deletePostController
);

export default postRoutes;
