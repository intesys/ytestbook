import { notifications } from "@mantine/notifications";
import {
  IMAGE_INSERT_COMPRESSION_QUALITY,
  IMAGE_INSERT_RESIZE_MAX_HEIGHT,
  IMAGE_INSERT_RESIZE_MAX_WIDTH,
} from "../constants/generic";
import Compressor from "compressorjs";

export const compressImage = (file: File | Blob) => {
  return new Promise<File | Blob>((resolve, reject) => {
    new Compressor(file, {
      quality: IMAGE_INSERT_COMPRESSION_QUALITY,
      maxWidth: IMAGE_INSERT_RESIZE_MAX_WIDTH,
      maxHeight: IMAGE_INSERT_RESIZE_MAX_HEIGHT,
      success: (result) => {
        resolve(result);
      },
      error(err) {
        notifications.show({
          withBorder: true,
          color: "red",
          title: "Error",
          message: "Error while handling the file",
        });
        reject(err);
      },
    });
  });
};
