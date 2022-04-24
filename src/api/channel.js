import request from '@/utils/request'

export const getAllChannels = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const addUserChannel = (params) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [params]
    }
  })
}

export const deleteUserChannel = (params) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${params}`
  })
}
