import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserList, UserSkeletonList } from "../components/user-list";

export const Leaderboard = () => {
  const data = useQuery(api.queries.topTenUsers);
  const { topTenUsers, totalUsers } = data || {};

  return (
    <main className="relative h-screen w-screen justify-center mx-auto p-10 flex items-center">
      <div className="flex flex-col space-y-4 text-center w-full h-full max-w-lg">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-crown mx-auto"
          >
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
            <path d="M5 21h14" />
          </svg>

          <h2 className="text-2xl font-semibold text-white mb-2">
            Leaderboard
          </h2>
          <p className="text-sm text-white">
            The top 10 protectors of the month
            {totalUsers && totalUsers > 10 && ` out of ${totalUsers} users`}
          </p>
        </div>
        {topTenUsers === undefined ? <UserSkeletonList /> : null}
        {topTenUsers && topTenUsers.length === 0 && (
          <div className="rounded-md border-opacity-[0.2] border border-dashed border-white h-20 flex items-center justify-center">
            Leaderboard is empty
          </div>
        )}

        {topTenUsers && topTenUsers?.length > 0 ? (
          <UserList users={topTenUsers || []} />
        ) : null}
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    </main>
  );
};
