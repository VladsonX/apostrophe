import { apiRequest } from "./client";

const TARGET_SYSTEM = "READER";

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
  get: (channelId) => apiRequest(`/api/v1/channels/${channelId}`),
  search: (query = "") => apiRequest(`/api/v1/channels/search?query=${encodeURIComponent(query)}`),
};

export const postsApi = {
  get: (postId) => apiRequest(`/api/v1/posts/${postId}`),
  latest: (from = 0, to = 999) => apiRequest(`/api/v1/posts/latest?from=${from}&to=${to}`),
  explore: (limit) => apiRequest(`/api/v1/posts/explore?limit=${limit}`),
  byChannel: (channelId, from = 0, to = 100) =>
    apiRequest(`/api/v1/posts?channelId=${channelId}&from=${from}&to=${to}`),
};

export const subscriptionsApi = {
  list: () => apiRequest("/api/v1/subscriptions"),
  follow: ({ channelId, topicId }) =>
    apiRequest("/api/v1/subscriptions", {
      method: "POST",
      body: { channel: { channelId }, ...(topicId && { topic: { topicId } }) },
    }),
  unfollow: ({ channelId, topicId }) =>
    apiRequest(
      `/api/v1/subscriptions?channelId=${channelId}${topicId ? `&topicId=${topicId}` : ""}`,
      { method: "DELETE" },
    ),
};
