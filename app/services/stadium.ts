/* eslint-disable import/no-unresolved */
import api from "./api";

export const initiateFootballStadiums = async () => {
  const response = await api.get("/stadiums");
  return response.data;
};

export const singleFootballStadium = async (id: number) => {
  const response = await api.get(`/stadiums/${id}/`);
  return response.data;
};

export const createFootballStadium = async (payload: FormData) => {
  const response = await api.post("/stadiums", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateFootballStadium = async (id: number, payload: FormData) => {
  const response = await api.post(`/stadiums/${id}?_method=PATCH`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteFootballStadium = async (id: number) => {
  const response = await api.delete(`/stadiums/${id}`);
  return response.data;
};

export const initiateFootballStadiumFiles = async (
  footballStadiumId: number | undefined
) => {
  const response = await api.get(`/stadiums/${footballStadiumId}/files`);
  return response.data;
};

export const createFootballStadiumFile = async (
  footballStadiumId: number | undefined,
  payload: FormData
) => {
  const response = await api.post(
    `/stadiums/${footballStadiumId}/files/upload`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteFootballStadiumFile = async (
  footballStadiumId: number | undefined,
  fileId: number
) => {
  const response = await api.delete(
    `/stadiums/${footballStadiumId}/files/${fileId}/delete`
  );
  return response.data;
};
