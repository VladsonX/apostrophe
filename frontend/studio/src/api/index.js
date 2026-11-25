import { apiRequest } from "./client";

const TARGET_SYSTEM = "STUDIO";

export const authApi = {
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      auth: false,
      body: { email, password, targetSystem: TARGET_SYSTEM },
    }),
  register: (user) => apiRequest("/auth/registration", { method: "POST", auth: false, body: user }),
};

export const channelsApi = {
  listMine: () => apiRequest("/api/v1/channels"),
  get: (channelId) => apiRequest(`/api/v1/channels/${channelId}`),
  create: (channel) => apiRequest("/api/v1/channels", { method: "POST", body: channel }),
  update: (channelId, patch) =>
    apiRequest(`/api/v1/channels/${channelId}`, { method: "PATCH", body: patch }),
  // Switching an existing channel to topic mode moves all its posts into `topic`.
  enableTopics: (channelId, topic) =>
    apiRequest(`/api/v1/channels/${channelId}/topics/enable`, { method: "PUT", body: topic }),
};

export const postsApi = {
  get: (postId) => apiRequest(`/api/v1/posts/${postId}`),
  byChannel: (channelId, from = 0, to = 100) =>
    apiRequest(`/api/v1/posts?channelId=${channelId}&from=${from}&to=${to}`),
  create: (post) => apiRequest("/api/v1/posts", { method: "POST", body: post }),
  update: (post) => apiRequest("/api/v1/posts", { method: "PATCH", body: post }),
  remove: (postId) => apiRequest(`/api/v1/posts/${postId}`, { method: "DELETE" }),
};

export const mediaApi = {
  // Returns the media key (uuid) of the uploaded file.
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest("/api/v1/media", { method: "POST", body: formData });
  },
};
