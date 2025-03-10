import { Notification } from "~/types/notification";
import api from "./api";

export const initiateNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const createNotification = async (payload: Partial<Notification>) => {
  const response = await api.post("/notifications", payload);
  return response.data;
};

export const updateNotification = async (
  id: number,
  payload: Partial<Omit<Notification, "id">>
) => {
  const response = await api.patch(`/notifications/${id}`, payload);
  return response.data;
};

export const deleteNotification = async (id: number) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
