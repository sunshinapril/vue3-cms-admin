import Cookies from "js-cookie";

export const TOKEN_KEY = "Admin-Token";
export const setToken = (token, cookieExpires) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: cookieExpires || 1,
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY) || "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOiIwNCIsInVzZXJfaWQiOjE3MTQ0NzIzNzg5MzY5ODc2NTEsImxvZ2luX3R5cGUiOiJMaW5rV2VDaGF0QVBJIiwidXNlcl9uYW1lIjoiYWRtaW4wMSIsInVzZXJfa2V5IjoiZDRjNDJlNDItNTNjOS00MmE4LTgxODMtYjBlOTk2NDVkMTg3IiwiZGVwdF9uYW1lIjoi5Y2O6Ze75pyf6LSnIiwiY29ycF9uYW1lIjoi5Y2O6Ze7ZeacnyIsImRlcHRfaWQiOjEwMCwiY29ycF9pZCI6Ind3MjcyMzU5YzAzNTM5ZTkzMyIsImRhdGFfc2NvcGUiOiIxIn0.U2y9FQgpH59nWJGfQS026Vp4IRm_ubClM1otEzjackVU17x7OtASQOE1ti5akIktxTxhywG2Nc5clY37BZztsQ";
};

export const getDomain = () => {
  return `${window.location.host.split(".").slice(-2).join(".")}`;
};

export const removeToken = (domain = getDomain()) => {
  Cookies.remove(TOKEN_KEY, {
    domain: domain,
  });
};
