import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { InviteFriends } from "./pages/invite-friends";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
