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
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;

  return {
    title: userId,
    description: userId,
  };
}

export default function ProfilePage({ params }: IProfilePageProps) {
  const { userId } = use(params);

  return <User userId={userId} />;
}
