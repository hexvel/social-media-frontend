import { USER } from "@/data/fate.data";

interface IProfileParams {
  params: {
    userId: number;
  };
}

export default async function ProfilePage({
  params: { userId },
}: IProfileParams) {
  const user = USER[1];
  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
}
