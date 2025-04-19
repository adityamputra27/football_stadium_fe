// eslint-disable-next-line import/no-unresolved
import api from "./api";

export const initiateNews = async () => {
  const response = await api.get("/news");
  return response.data;
};

export const createNews = async (payload: FormData) => {
  const response = await api.post("/news", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateNews = async (id: number, payload: FormData) => {
  const response = await api.post(`/news/${id}?_method=PATCH`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteNews = async (id: number) => {
  const response = await api.delete(`/news/${id}`);
  return response.data;
};
