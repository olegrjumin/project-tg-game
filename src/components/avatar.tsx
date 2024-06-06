import { cn } from "../lib/utils";

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) {
    return "U";
  }

  const firstNameInitial = firstName ? firstName[0] : "";
  const lastNameInitial = lastName ? lastName[0] : "";

  return firstNameInitial + lastNameInitial;
};

export const Avatar = ({
  firstName,
  lastName,
  size,
}: {
  size: "small" | "medium" | "large";
  firstName?: string;
  lastName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full mx-auto",
        {
          "size-12": size === "small",
          "size-24": size === "medium",
          "size-48": size === "large",
        },
      )}
    >
      <span
        className={cn("text-gray-600", {
          "text-[18px]": size === "small",
          "text-[32px]": size === "medium",
          "text-[48px]": size === "large",
        })}
      >
        {getInitials(firstName, lastName)}
      </span>
    </div>
  );
};
