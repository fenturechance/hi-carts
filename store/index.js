import Cookie from 'js-cookie'
// import jwtDecode from 'jwt-decode'
import axios from 'axios'
// import { API } from '~/api.js'
import { toUpperFirst } from '~/assets/js/utils.js'

export const state = () => ({
  locales: ['zh_tw'],
  locale: 'zh_tw',
  isUserLoggedIn: false,
  userPicture: '',
  userName: '',
  userUid: '',
  loading: false
})

export const getters = () => {

}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  setUserLoggedIn: (state, payload) => {
    state.isUserLoggedIn = true
    state.userPicture = payload.userPicture
    state.userName = payload.userName
    state.userUid = payload.userUid
    axios.defaults.headers.common.Authorization = `${toUpperFirst(payload.token_type)} ${payload.refresh_token}`
    if (process.client) {
      Cookie.set('id_token', payload.id_token)
      Cookie.set('refresh_token', payload.refresh_token)
      Cookie.set('userUid', state.userUid)
      Cookie.set('userPicture', state.userPicture)
      Cookie.set('userName', state.userName)
      Cookie.set('token_type', state.token_type)
    }
  },
  setUserlogout: (state, payload) => {
    state.isUserLoggedIn = false
    state.userPicture = ''
    state.userName = ''
    Cookie.remove('id_token')
    Cookie.remove('refresh_token')
    Cookie.remove('userUids')
    Cookie.remove('userPicture')
    Cookie.remove('userName')
    $nuxt.$router.push({ name: 'index' })
  },
  setLoading: (state, payload) => {
    state.loading = payload.loading
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, context) {
    if (context.app.$cookies.get('id_token')) {
      const picture = context.app.$cookies.get('userPicture')
      const name = context.app.$cookies.get('userName')
      const uid = context.app.$cookies.get('userUid')
      const tokenType = context.app.$cookies.get('token_type')
      commit('setUserLoggedIn', {
        userPicture: picture,
        userName: name,
        userUid: uid,
        token_type: tokenType
      })
    }
  }
}

export const namespaced = true
