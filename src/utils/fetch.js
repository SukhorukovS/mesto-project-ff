const DEFAULT_HEADERS = {
  authorization: "ec643d58-8d20-44e7-9012-854c26080b1f",
  Accept: "application/json",
  "Content-Type": "application/json",
};

const DEFAULT_CONFIG = {
  baseurl: "https://nomoreparties.co/v1/higher-front-back-dev",
  headers: DEFAULT_HEADERS,
};

export function doRequest(url, method, headers) {
  return fetch(`${DEFAULT_CONFIG.baseurl}${url}`, {
    method,
    headers: {
      ...DEFAULT_CONFIG.headers,
      ...headers,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
