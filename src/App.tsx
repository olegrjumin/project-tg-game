import { useIntegration } from "@tma.js/react-router-integration";
import { initNavigator, useLaunchParams } from "@tma.js/sdk-react";
import { useEffect, useMemo } from "react";
import { BrowserRouter,  Router, } from "react-router-dom";
import { useInitUser } from "./hooks/use-init-user";
import { isRunningWithinTelegram } from "./lib/storage";
import AppRoutes from "./app-routes";

function App() {
  useInitUser();
  const { platform } = useLaunchParams();

  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  if (!isRunningWithinTelegram(platform)) {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    )
  }

  return (
    <div>
      <Router location={location} navigator={reactNavigator}>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
