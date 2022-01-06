export const baseURL = 'https://api.hiskio.com/v2'
export const API = {
  member: {
    login: {
      url: '/auth/login',
      method: 'post'
    },
    me: {
      url: '/me',
      method: 'get'
    },
    exchangeToken: {
      url: '/v1/token',
      method: 'post'
    }
  }
}
