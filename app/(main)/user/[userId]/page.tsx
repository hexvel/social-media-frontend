import { use } from "react";
import { User } from "./_components/User";

interface IProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function ProfilePage({ params }: IProfilePageProps) {
  const { userId } = use(params);

  return <User userId={userId} />;
}
