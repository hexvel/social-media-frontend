import { Home, ImageIcon, MessageSquareReply, Users2 } from "lucide-react";

export const NAVIGATION_ITEMS = [
  { title: "Search", path: "/search" },
  { title: "Pages", path: "/pages" },
  { title: "My Network", path: "/my-network" },
  { title: "Account", path: "/account" },
];

export const navItems = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/friends", label: "Friends", Icon: Users2 },
  { path: "/messages", label: "Messages", Icon: MessageSquareReply },
  { path: "/photos", label: "Photos", Icon: ImageIcon },
];
