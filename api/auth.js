import request from '~/service'

export const authLogin = () => {
  request.post('/auth/login')
}