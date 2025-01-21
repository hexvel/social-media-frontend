import FollowUsers from "@/components/FollowUsers";

export default function HomePage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <h1 className="text-4xl">Welcome to HexBook!</h1>
        <p>This is the home page.</p>
      </div>
      <div className="flex flex-col gap-10">
        <FollowUsers />
        <FollowUsers />
      </div>
    </main>
  );
}
