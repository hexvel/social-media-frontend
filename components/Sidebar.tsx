import { Bell, Bookmark, Home, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={className}>
      <UserAvatar />
      <div className="bg-primary-theme">
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3 transition duration-200"
          title="Home"
          asChild
        >
          <Link href="/">
            <Home />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3 transition duration-200"
          title="Notifications"
          asChild
        >
          <Link href="/notifications">
            <Bell />
            <span className="hidden lg:inline">Notifications</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3 transition duration-200"
          title="Messages"
          asChild
        >
          <Link href="/messages">
            <MessagesSquare />
            <span className="hidden lg:inline">Messages</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3 transition duration-200"
          title="Bookmarks"
          asChild
        >
          <Link href="/bookmarks">
            <Bookmark />
            <span className="hidden lg:inline">Bookmarks</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
