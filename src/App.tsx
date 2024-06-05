import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "./components/layout";
import { useInitUser } from "./hooks/use-init-user";
import { Game } from "./pages/game";
import { Home } from "./pages/home";
import { InviteFriends } from "./pages/invite-friends";
import { Result } from "./pages/result";

function App() {
  useInitUser();

  return (
    <div>
      <Toaster position="top-center" duration={3000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
          <Route path="/result" element={<Result />} />
        </Route>
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
