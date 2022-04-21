import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = (params) => {
  return request({
    methods: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  })
}
