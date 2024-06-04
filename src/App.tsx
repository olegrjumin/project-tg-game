import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/layout";
import { Game } from "./pages/Game/game";
import { Home } from "./pages/Home/home";
import { InviteFriends } from "./pages/invite-friends";
import { ResultPage } from "./pages/result/result-page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
