import { initCloudStorage } from "@tma.js/sdk";

const isCloudStorageAvailable = (version: string) => {
  return version >= "6.9";
};

export const isRunningWithinTelegram = (platform: string) => {
  return platform !== "unknown";
};

export const getStorage = (platform: string, version: string) => {
  if (!isCloudStorageAvailable(version)) {
    throw new Error("Cloud storage is not available in this version");
  }

  if (isRunningWithinTelegram(platform)) {
    return initCloudStorage();
  } else {
    return window.localStorage;
  }
};
