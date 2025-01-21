import { VerifiedIcon } from "lucide-react";
import UserAvatar from "./UserAvatar";

export default function FollowUsers() {
  const users = [
    {
      id: 1,
      name: "Hexik Ass",
      username: "@official_hexvel",
    },
    {
      id: 2,
      name: "Hexik Ass",
      username: "@official_hexvel",
    },
    {
      id: 3,
      name: "Hexik Ass",
      username: "@official_hexvel",
    },
    {
      id: 4,
      name: "Hexik Ass",
      username: "@official_hexvel",
    },
  ];

  return (
    <div className="sticky h-fit top-[5.25rem] bg-primary-theme hidden p-4 w-72 flex-none xl:block lg:w-80 rounded-md">
      <div className="text-xl font-bold mb-4">Who to follow</div>
      <div className="flex flex-col gap-4">
        {users.map((user, index) => (
          <div key={user.id} className="flex justify-between">
            <div className="flex justify-center gap-x-3">
              <UserAvatar
                size={60}
                className="flex-none"
                gradientBorder={index % 2 === 0}
              />
              <div>
                <p className="line-clamp-1 flex items-center gap-x-2 break-all font-medium hover:underline">
                  {user.name}
                  <VerifiedIcon className="size-5 fill-sky-600" />
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground">
                  {user.username}
                </p>
              </div>
            </div>
            <button className="h-10 px-4 border border-secondary-theme text-secondary-theme border-double rounded-3xl font-medium hover:bg-secondary-theme hover:text-dark transition-colors">
              Follow
            </button>
          </div>
        ))}
        <span className="text-center text-secondary-theme cursor-pointer">
          View More
        </span>
      </div>
    </div>
  );
}
