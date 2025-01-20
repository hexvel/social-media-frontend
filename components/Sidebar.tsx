import SidebarNavItems from "./SidebarNavItems";
import UserAvatar from "./UserAvatar";
import UserFollowers from "./UserFollowers";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={className}>
      <UserAvatar />
      <UserFollowers />
      <SidebarNavItems />
    </div>
  );
}
