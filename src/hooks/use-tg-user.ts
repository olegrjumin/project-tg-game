import { useInitData } from "@tma.js/sdk-react";
import { useMemo } from "react";

export const useTgUser = () => {
  const initData = useInitData();
  const { user } = initData || {};
  const currentTgUserId = user?.id?.toString() || "";
  const newUser = useMemo(
    () => ({
      ...user,
      id: currentTgUserId,
    }),
    [user, currentTgUserId],
  );
  return newUser;
};
