"use client";

import { avatarUrl } from "@/components/Header";
import Post from "@/components/Post";
import RightSidebar from "@/components/RightSidebar";
import { Media } from "@/types/media.type";

export default function HomePage() {
  const posts = [
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, modi perspiciatis. Qui sed officiis eligendi hic totam aut aliquid voluptate dolore molestias quod consequatur aliquam quos voluptatibus aspernatur, reprehenderit ut.",
      createdAt: new Date(),
      photos: [
        {
          id: "1",
          type: "IMAGE",
          url: "/mountain.jpg",
        },
      ] as Media[],
      author: {
        id: 1,
        firstName: "Дима",
        lastName: "Абдукаримов",
        avatarUrl,
      },
    },
    {
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, laborum assumenda perspiciatis repellendus quisquam nisi culpa unde officiis temporibus voluptates, minus ipsam quis provident. Qui aliquam pariatur corporis! Culpa voluptates nisi ut sapiente eos amet temporibus tenetur debitis veritatis deserunt, cum aut ea recusandae dolores, nemo deleniti voluptatibus doloribus totam illo similique? Vero quaerat aut alias, nulla tempora adipisci ipsa impedit amet architecto nihil fuga soluta doloribus! Debitis magni ipsam tempore veniam eveniet necessitatibus non, iusto aliquid, earum vel doloremque.",
      createdAt: new Date(),
      author: {
        id: 1,
        firstName: "Дима",
        lastName: "Абдукаримов",
        avatarUrl,
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, modi perspiciatis. Qui sed officiis eligendi hic totam aut aliquid voluptate dolore molestias quod consequatur aliquam quos voluptatibus aspernatur, reprehenderit ut.",
      photos: [
        { id: "2", type: "IMAGE", url: "/profile-photo.webp" },
      ] as Media[],
      createdAt: new Date(),
      author: {
        id: 1,
        firstName: "Дима",
        lastName: "Абдукаримов",
        avatarUrl,
      },
    },
  ];

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="flex flex-col items-center w-full min-w-0 space-y-5">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
      <RightSidebar />
    </main>
  );
}
