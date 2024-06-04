import { Link } from "react-router-dom";
import { useScramble } from "use-scramble";

export const ResultPage = () => {
  const points = 50;
  const showSuccess = points >= 50;
  const { ref } = useScramble({
    text: "Malwarebytes.com",
    playOnMount: true,
  });

  return (
    <main className="justify-center mx-auto p-10 h-screen flex items-center">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex flex-col space-y-2 text-center">
        {showSuccess && (
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
            className="lucide lucide-shield-check size-24 mx-auto"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        )}

        {!showSuccess && (
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
            className="lucide lucide-shield-alert size-24 mx-auto"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        )}

        <div className="text-2xl">
          {showSuccess ? "Congratulations!" : "Oh... You lost!"}
        </div>

        <div className="text-3xl">{points} points</div>

        <div>
          {showSuccess ? (
            <>
              <p>
                You've managed to protect your device from threats on your own!
              </p>
              <p>Good luck with that, but there is a better way</p>
            </>
          ) : (
            <>
              <p>It's okay, you can always try again!</p>

              <p>
                It's better to rely on professionals when <br /> it comes to
                protecting your device from threats.
              </p>
            </>
          )}

          <p className="text-xl py-2" ref={ref}></p>
        </div>

        <div className="flex flex-col space-y-2">
          <Link
            to="/invite-friends"
            className="px-5 py-3 text-sm font-medium text-center hover:text-white text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
          >
            Invite new friends
          </Link>
          <Link
            to="/game"
            className="px-5 py-3 text-sm font-medium text-center hover:text-white text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
          >
            Start new game
          </Link>
        </div>
      </div>
    </main>
  );
};
