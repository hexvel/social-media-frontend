import { NAVIGATION_ITEMS } from "@/constants/navbar.constant";
import {
  Bell,
  MessageSquareTextIcon,
  PencilRulerIcon,
  Search,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const avatarUrl =
  "https://sun9-19.userapi.com/impg/jlQ3dukOjSe_RH0qLidE2QDOKkol9rugITuj2g/p7o9rQq_SYM.jpg?size=736x736&quality=95&sign=049e28e3dfc6f79b8e576b1195b62abf&type=album";

export default function Header() {
  return (
    <header className="hidden xl:flex w-full justify-between py-4 px-8 bg-primary-theme/60">
      <div className="flex items-center gap-x-2">
        <div className="bg-secondary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform">
          <PencilRulerIcon size={24} color="black" />
        </div>
        <div className="flex items-center gap-x-1 p-3 bg-primary-theme rounded-md shadow-md">
          <Search color="#6f7376" />
          <input
            type="text"
            placeholder="Search"
            className="w-[240px] bg-transparent focus:bg-transparent placeholder:text-[#6f7376] text-[#6f7376] placeholder:font-medium outline-none"
          />
        </div>
      </div>
      <nav className="flex items-center">
        <ul className="flex items-center gap-x-4">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.title} className="">
              <Link
                href={item.path}
                className="text-[#6f7376] font-medium hover:text-white/50 transition-colors"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-x-4">
        <div className="bg-primary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform shadow-lg">
          <MessageSquareTextIcon size={24} color="#6f7376" />
        </div>
        <div className="bg-primary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform shadow-lg">
          <SettingsIcon size={24} color="#6f7376" />
        </div>
        <div className="relative bg-primary-theme p-3 rounded-md cursor-pointer active:scale-95 transition-transform shadow-lg">
          <div className="h-2 w-2 bg-red-600 rounded-full absolute top-0 right-0" />
          <Bell size={24} color="#6f7376" />
        </div>
        <div>
          <Image
            src={avatarUrl}
            height={48}
            width={48}
            alt="Profile photo"
            className="rounded-md shadow-lg cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
