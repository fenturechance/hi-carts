import request from '~/service'

export const memberMe = () => {
  request.get('/me')
}