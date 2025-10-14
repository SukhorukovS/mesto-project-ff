import { doRequest } from "../utils/fetch"

export const getProfile = () => {
  return doRequest('/users/me', 'GET');
}

export const getCardList = () => {
  return doRequest('/cards', 'GET');
}
