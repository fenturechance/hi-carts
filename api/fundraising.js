import request from '~/service'

export const coursesFundraising = () => {
  request.get('/courses/fundraising')
}