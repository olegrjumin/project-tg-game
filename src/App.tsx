import { useIntegration } from "@tma.js/react-router-integration";
import { initNavigator } from "@tma.js/sdk-react";
import { useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { useInitUser } from "./hooks/use-init-user";
import { Game } from "./pages/game";
import { Home } from "./pages/home";
import { InviteFriends } from "./pages/invite-friends";
import { Leaderboard } from "./pages/leaderboard";
import { Result } from "./pages/result";

function App() {
  useInitUser();

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

  return (
    <div>
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/invite-friends" element={<InviteFriends />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/result" element={<Result />} />
          </Route>
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
