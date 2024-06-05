import ReactDOM from "react-dom/client";
import "./index.css";

import { mockTelegramEnv, parseInitData } from "@tma.js/sdk-react";
import { Root } from "./Root.tsx";

// This line of code allows us to safely launch the application even outside
// the Telegram application. It will also only be applied in development mode, not in
// production.
if (import.meta.env.DEV) {
  const initDataRaw = new URLSearchParams([
    [
      "user",
      JSON.stringify({
        id: 60436576,
        first_name: "Oleg",
        last_name: "R",
        username: "orjumin",
        language_code: "en",
      }),
    ],
    [
      "hash",
      "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
    ],
    ["auth_date", "171699928193222846"],
    ["start_param", "debug"],
    ["chat_type", "sender"],
    ["chat_instance", "8428209589180549439"],
  ]).toString();

  mockTelegramEnv({
    themeParams: {
      accentTextColor: "#6ab2f2",
      bgColor: "#17212b",
      buttonColor: "#5288c1",
      buttonTextColor: "#ffffff",
      destructiveTextColor: "#ec3942",
      headerBgColor: "#17212b",
      hintColor: "#708499",
      linkColor: "#6ab3f3",
      secondaryBgColor: "#232e3c",
      sectionBgColor: "#17212b",
      sectionHeaderTextColor: "#6ab3f3",
      subtitleTextColor: "#708499",
      textColor: "#f5f5f5",
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: "7.2",
    platform: "tdesktop",
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
