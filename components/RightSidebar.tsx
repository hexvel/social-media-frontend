"use client";

import { Loader2 } from "lucide-react";
import { Suspense, useCallback } from "react";
import FollowUsers from "./FollowUsers";

export default function RightSidebar() {
  const renderFollowUsers = useCallback(() => <FollowUsers />, []);

  return (
    <div className='sticky top-4 hidden h-fit w-72 flex-col gap-8 flex-none md:flex lg:w-80'>
      <Suspense fallback={<Loader2 className='mx-auto animate-spin' />}>
        {renderFollowUsers()}
      </Suspense>
    </div>
  );
}
