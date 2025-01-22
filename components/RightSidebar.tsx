"use client";

import { Loader2 } from "lucide-react";
import { Suspense, useCallback } from "react";
import FollowUsers from "./FollowUsers";
import TodayNews from "./TodayNews";

export default function RightSidebar() {
  const renderFollowUsers = useCallback(() => <FollowUsers />, []);
  const renderTodayNews = useCallback(() => <TodayNews />, []);

  return (
    <div className="sticky top-4 hidden h-fit w-72 flex-col gap-8 flex-none md:flex lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        {renderFollowUsers()}
        {renderTodayNews()}
      </Suspense>
    </div>
  );
}
