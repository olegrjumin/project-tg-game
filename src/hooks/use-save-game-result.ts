import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { useTgUser } from "./use-tg-user";

export const useSaveGameResult = (points: number) => {
  const user = useTgUser();
  const updateUserPointsMutation = useMutation(api.queries.updateUserPoints);

  useEffect(() => {
    async function saveResult() {
      await updateUserPointsMutation({
        tgUserId: user.id,
        points,
      });
    }

    if (!points || points === 0) return;

    saveResult();
  }, [points, updateUserPointsMutation, user.id]);
};
