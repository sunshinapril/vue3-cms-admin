import axios from "axios";
import q from "q";
import { ElNotification } from "element-plus";
import router from "@/router";
import { getToken, removeToken } from "./cookies";
function request(config) {
  const _config = {
    baseURL: import.meta.env.VITE_BASE_URL + '/api',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      "Content-Type": "application/json",
    },
    ...config,
  };
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error.response?.data ?? error.response;
    }
  );
  return q
    .resolve(
      axios(_config)
        .then((res) => {
          // console.log('res层级',res);
          switch (res.status) {
            case 200:
              return res.data;
            case 401: // 登录态失效
              removeToken();
              router.push({
                path: "/login",
              });
              return Promise.reject();
          }
          throw new Error(res?.message ?? `服务端错误，状态码: ${res.status}`);
        })
        .then((res) => {
          if (_config.useRowData) {
            return res;
          }
          if (!res || typeof res === "string") {
            throw new Error("服务端错误");
          }
          switch (res.code) {
            case 200:
              return res;
            case 401: // 登录态失效
              removeToken();
              router.push({
                path: "/login",
              });
              break;
          }
          throw new Error(res.message || "请求错误");
        })
    )
    .catch((e) => {
      console.log("err", e);
      ElNotification({
        title: e.message ?? "系统错误",
        type: "error",
      });
      return q.reject(e);
    });
}

export default request;
