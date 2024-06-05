import { Outlet } from "react-router-dom";
import { Menu } from "./menu";

export const Layout = () => {
  return (
    <div>
      <Outlet />
      <Menu />
    </div>
  );
};
