export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "post" | "comment" | "like" | "follow";
  date: Date;
  isRead: boolean;
  userId: string;
  userAvatar: string;
}
