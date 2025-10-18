import { doRequest } from "../utils/fetch";

export const getProfile = () => {
  return doRequest({ url: "/users/me", method: "GET" });
};

export const getCardList = () => {
  return doRequest({ url: "/cards", method: "GET" });
};

export const updateProfile = (profile) => {
  return doRequest({
    url: "/users/me",
    method: "PATCH",
    body: JSON.stringify(profile),
  });
};
