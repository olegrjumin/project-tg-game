import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/invite-friends">Invite Friends</a>
      </nav>
      <Outlet />
    </div>
  );
};
