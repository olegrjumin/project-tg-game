import { useLaunchParams } from "@tma.js/sdk-react";
import { useMemo } from "react";
import { getStorage } from "../lib/storage";

export const useStorage = () => {
  const lp = useLaunchParams();

  const storage = useMemo(
    () => getStorage(lp.platform, lp.version),
    [lp.platform, lp.version],
  );

  return storage;
};
