import { USER } from "@/data/fake.data";

interface IProfileParams {
  params: {
    userId: number;
  };
}

export default async function ProfilePage() {
  const user = USER[1];
  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
}
