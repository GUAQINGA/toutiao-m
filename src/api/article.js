import request from '@/utils/request'

// 获取文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 获取文章
export const getArticlesById = (params) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${params}`
  })
}

// 收藏文章
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
