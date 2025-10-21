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

export const createNewCard = (card) => {
  return doRequest({
    url: "/cards",
    method: "POST",
    body: JSON.stringify(card),
  });
}

export const deleteCard = (cardId) => {
  return doRequest({
    url: `/cards/${cardId}`,
    method: "DELETE",
  });
}

export const likeCard = (cardId) => {
  return doRequest({
    url: `/cards/likes/${cardId}`,
    method: "PUT",
  })
}

export const unLikeCard = (cardId) => {
  return doRequest({
    url: `/cards/likes/${cardId}`,
    method: "DELETE",
  })
}
