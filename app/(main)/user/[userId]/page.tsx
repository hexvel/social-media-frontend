"use client";

import { USER } from "@/data/fake.data";

export default function ProfilePage() {
  const user = USER[1];

  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
}
