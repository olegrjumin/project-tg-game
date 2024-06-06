import { useGetInvitees } from "../hooks/use-get-invitees";
import { FallingViruses } from "./scenes/FallingViruses";

export const useCreateFallingVirusesScene = (
  callbackFunction: (score: number) => void,
) => {
  const invitees = useGetInvitees();
  const scoreMultiplier = invitees && invitees.length ? invitees.length : 1;
  return class extends FallingViruses {
    constructor() {
      super(callbackFunction, scoreMultiplier);
    }
  };
};
