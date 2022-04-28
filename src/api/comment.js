import request from '@/utils/request'

// 获取文章评论列表
export const getComment = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
