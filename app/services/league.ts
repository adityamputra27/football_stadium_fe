/* eslint-disable import/no-unresolved */
import api from "./api";

export const initiateFootballLeagues = async () => {
  const response = await api.get("/leagues");
  return response.data;
};

export const createFootballLeague = async (payload: FormData) => {
  const response = await api.post("/leagues", payload);
  return response.data;
};

export const updateFootballLeague = async (id: number, payload: FormData) => {
  const response = await api.post(`/leagues/${id}?_method=PATCH`, payload);
  return response.data;
};

export const deleteFootballLeague = async (id: number) => {
  const response = await api.delete(`/leagues/${id}`);
  return response.data;
};
