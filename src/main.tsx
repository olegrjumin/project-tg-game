import ReactDOM from "react-dom/client";

import { Root } from "./Root.tsx";

// This line of code allows us to safely launch the application even outside
// the Telegram application. It will also only be applied in development mode, not in
// production.
import "./mockEnv.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
