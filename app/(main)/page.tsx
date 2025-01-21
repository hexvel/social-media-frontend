import RightSidebar from "@/components/RightSidebar";

export default function HomePage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-secondary-theme">HEXBook</span>!
        </h1>
        <p>
          This is the home page. You can explore the various features of
          HexBook, such as creating posts, following other users, and checking
          the latest news. Please note that this is a demo version of HexBook,
          and the features and functionalities may not be fully implemented.
        </p>
      </div>
      <RightSidebar />
    </main>
  );
}
