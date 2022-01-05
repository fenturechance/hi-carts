import request from '~/service'

export const fetchCarts = () => {
  request.post('/carts')
}

export const deleteCarts = () => {
  request.delete('/carts')
}