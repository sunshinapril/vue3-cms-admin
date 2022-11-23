import Cookies from "js-cookie";

export const TOKEN_KEY = "westmoney";
export const setToken = (token, cookieExpires) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: cookieExpires || 1,
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY) || "143432";
};

export const getDomain = () => {
  return `${window.location.host.split(".").slice(-2).join(".")}`;
};

export const removeToken = (domain = getDomain()) => {
  Cookies.remove(TOKEN_KEY, {
    domain: domain,
  });
};
