import Image from "next/image";

export default function TodayNews() {
  // данные придут из бэка, пока тестово списком
  const news = [
    {
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, modi.",
      image: "/mountain.jpg",
      date: "2h",
    },

    {
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, modi.",
      image: "/mountain.jpg",
      date: "2h",
    },
  ];

  return (
    <div className="h-fit bg-primary-theme hidden p-4 w-72 flex-none xl:block lg:w-80 rounded-md">
      <div className="text-xl font-bold mb-4">Today's news</div>
      {news.map((item, index) => (
        <div key={index} className="flex flex-col py-2 gap-2">
          <div className="relative">
            <Image
              src={item.image}
              width={400}
              height={140}
              alt="Today new"
              className="h-[140px] rounded-xl"
            />
            <p className="absolute text-muted-foreground -bottom-8 right-0">
              {item.date}
            </p>
          </div>
          <p className="text-sm">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
