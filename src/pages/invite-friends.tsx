import { initUtils } from "@tma.js/sdk";
import { Avatar } from "../components/avatar";
import { useGetInvitees } from "../hooks/use-get-invitees";
import { useTgUser } from "../hooks/use-tg-user";

const Friend = ({
  _id,
  firstName,
  lastName,
  points,
}: {
  _id: string;
  firstName: string;
  lastName: string;
  points: number;
}) => {
  return (
    <li className="pb-3 sm:pb-4" key={_id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <Avatar size="small" firstName={firstName} lastName={lastName} />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-white">
            {firstName} {lastName}
          </p>
          <p className="text-sm font-medium text-white">{_id.slice(0, 6)}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-white">
          {points}
        </div>
      </div>
    </li>
  );
};

const FriendsList = ({
  friends,
}: {
  friends: ReturnType<typeof useGetInvitees>;
}) => {
  return (
    <>
      <ul className="max-w-md divide-y divide-gray-200">
        {friends?.map((friend) => {
          return <Friend key={friend._id} {...friend} />;
        })}
      </ul>
    </>
  );
};

const Skeleton = () => {
  return (
    <div className="flex items-center mt-4">
      <svg
        className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export const InviteFriends = () => {
  const utils = initUtils();
  const currentTgUser = useTgUser();

  const invitees = useGetInvitees();

  const openLink = () => {
    const botLink = `https://t.me/tapathon_bot/app?startapp=${currentTgUser.id}`;
    const text = "Join me in Tapathon! Let's see who can tap the fastest!";
    const shareLink = `https://t.me/share/url?url=${botLink}&text=${text}`;

    utils.openTelegramLink(shareLink);
  };

  return (
    <main className="justify-center mx-auto p-10 h-screen flex items-center">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex flex-col space-y-10 text-center">
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
            className="lucide lucide-users mx-auto"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>

          <h2 className="text-2xl font-semibold text-white">Invite friend!</h2>
          <p className="text-sm text-white">
            Invite your friends to join the Tapathon and gain more protection
            shields!
          </p>
        </div>
        {invitees === undefined ? <Skeleton /> : null}
        {invitees && invitees.length === 0 && (
          <div className="border rounded-sm border-opacity-[0.2] border- border-dashed border-white">
            List is empty
          </div>
        )}

        {invitees && invitees?.length > 0 ? (
          <FriendsList friends={invitees || []} />
        ) : null}

        <button
          onClick={openLink}
          className="px-5 py-3 text-sm font-medium text-center hover:text-white text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
          Invite friends
        </button>
      </div>
    </main>
  );
};
