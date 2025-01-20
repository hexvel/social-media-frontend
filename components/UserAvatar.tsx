import { BadgeCheckIcon } from "lucide-react";
import Image from "next/image";
import { avatarUrl } from "./Header";

export default function UserAvatar() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[130px] h-[130px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400  p-[2px]">
          <div className="rounded-full bg-black p-1">
            <Image
              src={avatarUrl}
              alt="Profile Pic"
              width={130}
              height={130}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <span className="text-2xl flex items-center gap-x-2">
        Hexik Ass <BadgeCheckIcon size={24} className="fill-sky-600" />
      </span>
      <span className="text-muted-foreground">@official_hexvel</span>
    </div>
  );
}
