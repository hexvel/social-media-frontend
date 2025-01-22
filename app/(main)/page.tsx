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
      images: [
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
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, laborum assumenda perspiciatis repellendus quisquam nisi culpa unde officiis temporibus voluptates, minus ipsam quis provident. Qui aliquam pariatur corporis! Culpa voluptates nisi ut sapiente eos amet temporibus tenetur debitis veritatis deserunt, cum aut ea recusandae dolores, nemo deleniti voluptatibus doloribus totam illo similique? Vero quaerat aut alias, nulla tempora adipisci ipsa impedit amet architecto nihil fuga soluta doloribus! Debitis magni ipsam tempore veniam eveniet necessitatibus non, iusto aliquid, earum vel doloremque. Aperiam dicta est voluptatum vel nam, dolorum earum illo commodi rerum blanditiis eum molestias obcaecati harum non illum eveniet ab mollitia, suscipit doloribus tenetur numquam quasi optio voluptas. Perferendis, modi! Omnis perspiciatis possimus minus obcaecati, porro quae, perferendis accusamus quisquam explicabo ipsa voluptatum deserunt quam illum? Minima obcaecati quos voluptatum ipsa at debitis nostrum aut quia explicabo! Necessitatibus magni praesentium illo id inventore temporibus cupiditate suscipit maiores quas delectus blanditiis quibusdam enim, tenetur cum quia nemo. Culpa, repudiandae iure architecto adipisci ex ad labore beatae excepturi in possimus reprehenderit? Sit eveniet facere, repellendus modi dolorem soluta facilis numquam tempora voluptatem corporis dignissimos sequi officia assumenda nemo quibusdam aperiam delectus aliquam praesentium asperiores? Asperiores perspiciatis id, esse nam maiores ab laudantium.",
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
      images: [
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
