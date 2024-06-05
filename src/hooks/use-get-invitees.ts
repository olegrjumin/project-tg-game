import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useTgUser } from "./use-tg-user";

export const useGetInvitees = () => {
  const currentTgUser = useTgUser();

  const invitees = useQuery(api.queries.invitees, {
    tgUserId: currentTgUser.id as Id<"users">,
  });

  return invitees;
};
