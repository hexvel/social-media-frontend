import { truncateText } from "@/lib/utils";
import Image from "next/image";

export default function PagesYouLike() {
  const channels = [
    {
      title: "World of Mountains",
      image: "/profile-photo.webp",
    },
    {
      title: "Mountain Life",
      image: "/profile-photo.webp",
    },
    {
      title: "Mountains Calling in Progress",
      image: "/profile-photo.webp",
    },
    {
      title: "Mountaineering",
      image: "/profile-photo.webp",
    },
  ];
  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        {channels.map((channel) => (
          <div key={channel.title} className="flex items-center gap-x-3">
            <Image
              src={channel.image}
              alt={channel.title}
              width={38}
              height={38}
              className="rounded-full"
            />
            <span className="text-white/60">
              {truncateText(channel.title, 20)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
