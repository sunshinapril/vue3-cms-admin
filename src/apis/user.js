import request from "@/utils/request";

// 获取useInfo
export const getUserInfo = () => {
  return request({
    url: "/mocks/userInfo.json",
    method: "get",
  });
};

export function buildMenus() {
  return request({
    url: "/mocks/menus.json",
    method: "get",
  });
}
