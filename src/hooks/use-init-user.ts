import { useLaunchParams } from "@tma.js/sdk-react";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { useTgUser } from "./use-tg-user";

export const useInitUser = () => {
  const [userJustCreated, setUserJustCreated] = useState(false);

  const currentTgUser = useTgUser();
  const lp = useLaunchParams();
  const refId = lp.startParam || "";

  const userExistsQueryResult = useQuery(api.queries.userByTelegramId, {
    tgUserId: currentTgUser?.id,
  });
  const newUserMutation = useMutation(api.queries.newUser);
  const userExists = !!userExistsQueryResult?._id;
  const userExistsIsDefined = userExistsQueryResult !== undefined;

  useEffect(() => {
    if (userExists && !userJustCreated) {
      toast.info(`Welcome back!`!);
    }
  }, [userExists, userJustCreated]);

  useEffect(() => {
    if (
      refId &&
      refId !== currentTgUser.id &&
      userExistsIsDefined &&
      !userExists
    ) {
      toast.info(`Welcome to the Tapathon! You have been invited!`!);
    }
  }, [refId, currentTgUser.id, userExists, userExistsIsDefined]);

  useEffect(() => {
    if (userExists) {
      return;
    }
    async function createUser() {
      await newUserMutation({
        firstName: currentTgUser?.firstName || "",
        lastName: currentTgUser?.lastName || "",
        tgUserId: currentTgUser.id,
        refId: refId,
      });
      setUserJustCreated(true);
    }

    createUser();
  }, [currentTgUser, newUserMutation, refId, userExists]);
};
