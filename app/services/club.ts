/* eslint-disable import/no-unresolved */
import api from "./api";

export const initiateFootballClub = async () => {
  const response = await api.get("/clubs");
  return response.data;
};

export const createFootballClub = async (payload: FormData) => {
  const response = await api.post("/clubs", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateFootballClub = async (id: number, payload: FormData) => {
  const response = await api.post(`/clubs/${id}?_method=PATCH`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteFootballClub = async (id: number) => {
  const response = await api.delete(`/clubs/${id}`);
  return response.data;
};
