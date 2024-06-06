import { FallingViruses } from "./scenes/FallingViruses";

export const createFallingVirusesScene = (
  callbackFunction: (score: number) => void,
) => {
  return class extends FallingViruses {
    constructor() {
      super(callbackFunction);
    }
  };
};
