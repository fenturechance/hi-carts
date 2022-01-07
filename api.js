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
    }
  },
  courses: {
    fundraising: {
      url: '/courses/fundraising',
      method: 'get'
    }
  },
  carts: {
    delete: {
      url: '/carts',
      method: 'delete'
    },
    get: {
      url: '/carts',
      method: 'post'
    },
    create: {
      url: '/carts',
      method: 'post'
    }
  }
}
