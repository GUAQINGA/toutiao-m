import request from '@/utils/request'

export const getAllChannels = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
