import request from "@/utils/request";

// 获取路由
export const buildMenus = () => {
  return request({
    url: '/system/user/getRouters',
    method: 'get',
  })
}
