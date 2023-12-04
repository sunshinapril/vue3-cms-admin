import request from "@/utils/request";

// 获取消息通知配置
export const getMsgConfig = (params) => {
  return request({
    url: '/hwapi/msgConfig/getMsgConfig',
    method: 'get',
    params
  })
}

// 保存消息通知配置
export const saveMsgConfig = (data) => {
  return request({
    url: '/hwapi/msgConfig//addOrUptMsgConfig',
    method: 'post',
    data
  })
}

// 获取消息列表
export const getMsgList = (params) => {
  return request({
    url: '/hwapi/msg/page',
    method: 'get',
    params
  })
}

// 获取弹窗消息列表
export const getAlertMsgList = (params) => {
  return request({
    url: '/hwapi/msg/page2',
    method: 'get',
    params
  })
}

// 查询未读消息数
export const getNoReadCount = (params) => {
  return request({
    url: '/hwapi/msg/getNoReadCount',
    method: 'get',
    params
  })
}

