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

export type NotificationTopicCategory =
  | "topic_football_stadium"
  | "topic_football_news"
  | "topic_football_league"
  | "topic_football_club"
  | "topic_football_player"
  | "topic_football_match"
  | "topic_football_event"
  | "topic_welcome";

export interface Notification {
  id: number;
  title: string;
  description: string;
  status: "success" | "error" | "info";
  category: NotificationCategory;
  topic_category: NotificationTopicCategory;
  send_push: boolean;
  created_at: string;
}
