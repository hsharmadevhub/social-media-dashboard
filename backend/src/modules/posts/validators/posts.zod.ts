import zod from "zod";

const MONGO_OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const AddPostSchema = zod.object({
  post: zod.string(),
});

export const GetPostSchemaRouteParams = zod.object({
  id: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid objectId"),
});

export const UpdatePostSchemaRouteParams = zod.object({
  id: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid objectId"),
});

export const UpdatePostSchemaBodyParams = zod.object({
  post: zod.string(),
});

export const DeletePostSchemaRouteParams = zod.object({
  id: zod.string().regex(MONGO_OBJECT_ID_REGEX, "invalid objectId"),
});

export type AddPostParams = zod.infer<typeof AddPostSchema>;
export type GetPostRouteParams = zod.infer<typeof GetPostSchemaRouteParams>;
export type UpdatePostRouteParams = zod.infer<
  typeof UpdatePostSchemaRouteParams
>;
export type UpdatePostBodyParams = zod.infer<typeof UpdatePostSchemaBodyParams>;
export type UpdatePostParams = UpdatePostRouteParams & UpdatePostBodyParams;
export type DeletePostRouteParams = zod.infer<
  typeof DeletePostSchemaRouteParams
>;
