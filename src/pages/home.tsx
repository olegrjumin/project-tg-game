import { Link } from "react-router-dom";
import { Avatar } from "../components/avatar";
import { useTgUser } from "../hooks/use-tg-user";

export const Home = () => {
  const currentTgUser = useTgUser();

  return (
    <main className="justify-center mx-auto p-10 h-screen flex items-center">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex flex-col space-y-10 text-center">
        <Avatar
          firstName={currentTgUser?.firstName}
          lastName={currentTgUser?.lastName}
          size="medium"
        />

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
