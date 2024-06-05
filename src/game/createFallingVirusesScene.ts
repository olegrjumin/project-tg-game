import { FallingViruses } from "./scenes/FallingViruses"

export const  createFallingVirusesScene = (callbackFunction: () => void) => {
    return class extends FallingViruses {
        constructor() {
            super(callbackFunction)
        }
    }
}