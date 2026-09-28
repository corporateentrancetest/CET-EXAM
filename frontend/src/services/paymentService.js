import api from "./api";

export const paymentService = {
  config: () => api.get("/payments/config").then((r) => r.data.data),
  createOrder: () => api.post("/payments/create-order").then((r) => r.data.data),
  verify: (payload) => api.post("/payments/verify", payload).then((r) => r.data.data),
};

export const adminService = {
  stats: () => api.get("/admin/stats").then((r) => r.data.data),
  applications: (params) => api.get("/admin/applications", { params }).then((r) => r.data.data),
  application: (id) => api.get(`/admin/applications/${id}`).then((r) => r.data.data),
  updateStatus: (id, status) =>
    api.patch(`/admin/applications/${id}/status`, { status }).then((r) => r.data.data),
  payments: () => api.get("/admin/payments").then((r) => r.data.data),
};
