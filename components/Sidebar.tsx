import { BadgeCheckIcon } from "lucide-react";
import SidebarNavItems from "./SidebarNavItems";
import UserAvatar from "./UserAvatar";
import UserFollowers from "./UserFollowers";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="hidden sm:flex rounded-md flex-col items-center w-72">
        <UserAvatar size={130} gradientBorder />
        <span className="text-2xl flex items-center gap-x-2">
          Дима Абдукаримов <BadgeCheckIcon size={24} className="fill-sky-600" />
        </span>
        <span className="text-muted-foreground">@official_hexvel</span>
      </div>
      <UserFollowers />
      <SidebarNavItems className={className} />
    </div>
  );
}
