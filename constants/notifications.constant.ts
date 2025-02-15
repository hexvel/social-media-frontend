import { Notification } from "@/types/notification.types";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New follower",
    message: "User @testuser followed you",
    date: new Date("2025-02-14T10:00:00"),
    isRead: false,
    type: "follow",
    userId: "1",
    userAvatar: "/default-avatar.png",
  },
  {
    id: "2",
    title: "New comment",
    message: "User @testuser commented on your post",
    date: new Date("2025-02-12T15:30:00"),
    isRead: true,
    type: "comment",
    userId: "1",
    userAvatar: "/default-avatar.png",
  },
  {
    id: "3",
    title: "New follower",
    message: "User @testuser followed you",
    date: new Date("2024-03-20T10:00:00"),
    isRead: true,
    type: "follow",
    userId: "1",
    userAvatar: "/default-avatar.png",
  },
];
