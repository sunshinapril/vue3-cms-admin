import request from "@/utils/request";

// 获取useInfo
export const getUserInfo = () => {
  return request({
    url: "http://localhost:3100/mocks/userInfo.json",
    method: "get",
  });
};

export function buildMenus() {
  return request({
    url: "http://localhost:3100/mocks/menus.json",
    method: "get",
  });
}
