import React from "react";

export const formatBytes = (bytes, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const extractFileName = (file: string): string => {
  const splitFileName = file.split("\\");
  return splitFileName[splitFileName.length - 1];
};

export const enterKeyFilter = async (
  e: React.MouseEvent | React.KeyboardEvent,
  func,
): Promise<void> => {
  if (e.nativeEvent instanceof KeyboardEvent) {
    if (e.nativeEvent.key !== "Enter") {
      return;
    }
  }
  await func();
};
