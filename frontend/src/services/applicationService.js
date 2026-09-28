import api from "./api";

export const applicationService = {
  getMine: () => api.get("/applications/me").then((r) => r.data.data),
  update: (payload) => api.patch("/applications/me", payload).then((r) => r.data.data),
  submit: () => api.post("/applications/me/submit").then((r) => r.data.data),
  uploadDocuments: (formData) =>
    api
      .post("/applications/me/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data.data),
};
