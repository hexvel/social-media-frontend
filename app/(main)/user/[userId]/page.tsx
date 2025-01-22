interface IProfileParams {
  params: {
    userId: number;
  };
}

export default async function ProfilePage({
  params: { userId },
}: IProfileParams) {
  return <div>{userId}</div>;
}
