import { useLaunchParams } from "@tma.js/sdk-react";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { useTgUser } from "./use-tg-user";

export const useInitUser = () => {
  const currentTgUser = useTgUser();
  const lp = useLaunchParams();
  const refId = lp.startParam || "";
  const convex = useConvex();

  useEffect(() => {
    async function createUser(newRefId?: string) {
      await convex.mutation(api.queries.newUser, {
        firstName: currentTgUser?.firstName || "",
        lastName: currentTgUser?.lastName || "",
        tgUserId: currentTgUser.id,
        refId: newRefId,
      });
    }

    async function initUser() {
      const user = await convex.query(api.queries.userByTelegramId, {
        tgUserId: currentTgUser?.id,
      });

      if (currentTgUser.id === user?.tgUserId) {
        toast.info(`Welcome back!`);
        return;
      }

      const refUser = await convex.query(api.queries.userByTelegramId, {
        tgUserId: refId,
      });

      if (refUser?.tgUserId === refId) {
        await createUser(refId);
        toast.info(
          `Welcome to the Tapathon! You have been invited by ${refUser.firstName}!`,
        );
        return;
      } else {
        await createUser();
        const noRefUser = refId && refUser === null;
        toast.info(
          `Welcome to the Tapathon! ${noRefUser ? "User who invited you does not exist" : ""}`,
        );
        return;
      }
    }

    initUser();
  }, [currentTgUser, convex, refId]);
};
