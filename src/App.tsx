import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Game } from "./pages/game";
import { Home } from "./pages/home";
import { InviteFriends } from "./pages/invite-friends";
import { Result } from "./pages/result";

function App() {
  return (
    <div>
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
