import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/layout";
import { Home } from "./pages/Home/home";
import { InviteFriends } from "./pages/invite-friends";
import { Game } from "./pages/Game/game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
