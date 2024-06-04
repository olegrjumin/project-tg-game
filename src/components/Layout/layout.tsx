import { Outlet } from "react-router-dom";
import { Menu } from "../Menu/menu";

export const Layout = () => {
  return (
    <div>
      <Outlet />
      <Menu />
    </div>
  );
};
