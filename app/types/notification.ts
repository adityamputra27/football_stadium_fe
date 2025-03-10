export enum NotificationCategory {
  WELCOME = "WELCOME",
  GOODBYE = "GOODBYE",
  UPDATE = "UPDATE",
  PROMOTION = "PROMOTION",
  ALERT = "ALERT",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  SOCIAL = "SOCIAL",
  TRANSACTION = "TRANSACTION",
  JOB = "JOB",
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  status: "success" | "error" | "info";
  category: NotificationCategory;
  created_at: string;
}
