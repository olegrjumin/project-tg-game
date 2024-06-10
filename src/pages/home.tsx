import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import { api } from "../../convex/_generated/api";
import { Avatar } from "../components/avatar";
import { GlowingStarsBackgroundCard } from "../components/glowing-stars";
import { useTgUser } from "../hooks/use-tg-user";
import logo from "/mb-logo.png";

export const PointsSkeleton = () => {
  return (
    <div className="text-center h-10 bg-slate-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
  );
};

export const Home = () => {
  const currentTgUser = useTgUser();
  const user = useQuery(api.queries.userByTelegramId, {
    tgUserId: currentTgUser?.id,
  });

  return (
    <>
      <Toaster position="top-center" duration={3000} />
      <main className="justify-center mx-auto h-screen flex items-center">
        <GlowingStarsBackgroundCard />
        <div className="absolute right-2 top-2">
          <img src={logo} alt="logo" className="h-5" />
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="flex flex-col space-y-10 text-center">
          <div className="flex flex-col relative z-[10]">
            <Avatar
              firstName={currentTgUser?.firstName}
              lastName={currentTgUser?.lastName}
              size="medium"
            />
            <div className="mt-2 font-mono h-4">
              {user?.firstName} {user?.lastName}
            </div>
          </div>

          <div className="relative">
            <p className="text-[2rem] font-mono font-bold h-12">
              {user?.points || 0} P
            </p>

            <p>Help protect your device from malware.</p>
            <p>Join the protection squad!</p>
          </div>
          <Link
            to="/game"
            className="relative z-[10] px-5 py-3 text-sm font-medium text-center hover:text-white text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
          >
            Start the game
          </Link>
        </div>
      </main>
    </>
  );
};
