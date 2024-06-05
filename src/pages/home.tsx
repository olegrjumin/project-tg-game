import { useInitData } from "@tma.js/sdk-react";
import { Link } from "react-router-dom";

const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return firstName[0] + lastName[0];
};

export const Home = () => {
  const initData = useInitData();
  const { user } = initData || {};

  const initials = getInitials(`${user?.firstName} ${user?.lastName}`);

  return (
    <main className="justify-center mx-auto p-10 h-screen flex items-center">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex flex-col space-y-10 text-center">
        <div className="relative inline-flex items-center justify-center size-24 overflow-hidden bg-gray-100 rounded-full mx-auto">
          <span className="text-gray-600 text-3xl">{initials}</span>
        </div>

        <div>
          <p>Help protect your device from malware.</p>
          <p>Join the protection squad.</p>
        </div>

        <Link
          to="/game"
          className="px-5 py-3 text-sm font-medium text-center hover:text-white text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
        >
          Start the game
        </Link>
      </div>
    </main>
  );
};
