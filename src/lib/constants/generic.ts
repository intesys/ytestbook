import { TCollaborator } from "../../types/schema.ts";

export const USER_ANONYMOUS: TCollaborator = {
  id: "Anonymous",
  createdAt: 0,
  email: "anonymous@example.com",
  name: "Anonymous",
};

export const IMAGE_UPLOAD_MAX_SIZE = 2 * 1024 ** 2; // 2Mb
export const IMAGE_UPLOAD_ALLOWED_MIME_TYPES = ["image/*"]; // all images

export const IMAGE_PASTE_ALLOWED_MIME_TYPES = ["image/*"]; // all images
export const IMAGE_PASTE_COMPRESSION_QUALITY = 0.6;
export const IMAGE_PASTE_RESIZE_MAX_WIDTH = 600;
export const IMAGE_PASTE_RESIZE_MAX_HEIGHT = 400;
