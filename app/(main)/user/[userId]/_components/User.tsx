"use client";

import Loader from "@/components/Loader";
import { useGetUserQuery } from "@/services/user.service";
export const User = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetUserQuery(userId);

  if (isLoading) return <Loader />;

  if (!data) return <div>User not found</div>;

  return (
    <div>
      {data.firstName} {data.lastName}
    </div>
  );
};
