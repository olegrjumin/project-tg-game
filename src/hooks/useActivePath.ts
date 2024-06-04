import { useLocation } from "react-router-dom";

export const useActivePath = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return { isActive };
};
