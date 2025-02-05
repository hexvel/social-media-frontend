import { Metadata } from "next";
import { use } from "react";
import { User } from "./_components/User";

interface IProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> {
  return {
    title: params.userId,
    description: params.userId,
  };
}

export default function ProfilePage({ params }: IProfilePageProps) {
  const { userId } = use(params);

  return <User userId={userId} />;
}
