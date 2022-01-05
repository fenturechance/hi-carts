import Cookie from 'js-cookie'
// import jwtDecode from 'jwt-decode'
import API from '~/api.js'

export const state = () => ({
  locales: ['zh_tw'],
  locale: 'zh_tw',
  isUserLoggedIn: false,
  userPicture: '',
  userName: '',
  userUid: '',
  userFavorite: null,
  courses: []
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
    state.userPicture = payload.userPicture || 'https://bulma.io/images/placeholders/128x128.png'
    state.userName = payload.userName
    state.userUid = payload.userUid
    if (process.client) {
      Cookie.set('id_token', payload.id_token)
      Cookie.set('refresh_token', payload.refresh_token)
      Cookie.set('userUid', state.userUid)
      Cookie.set('userPicture', state.userPicture)
      Cookie.set('userName', state.userName)
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
  add_test_data: (state, payload) => {
    state.test_data.title = payload.title
    state.test_data.aaa++
  },
  set_courses: (state, payload) => {
    state.courses = payload.courses
  },
  set_userFavorite: (state, payload) => {
    state.userFavorite = payload || {}
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, context) {
    if (context.query.id_token && context.query.refresh_token) {
      const idTokenDecode = jwtDecode(context.query.id_token)
      commit('setUserLoggedIn', {
        id_token: context.query.id_token,
        refresh_token: context.query.refresh_token,
        userUid: idTokenDecode.user_id,
        userPicture: idTokenDecode.picture,
        userName: idTokenDecode.name
      })
      dispatch('saveMemberInfo')
      context.app.$cookies.set('id_token', context.query.id_token)
      context.app.$cookies.set('refresh_token', context.query.refresh_token)
      context.app.$cookies.set('userUid', idTokenDecode.user_id)
      context.app.$cookies.set('userPicture', idTokenDecode.picture)
      context.app.$cookies.set('userName', idTokenDecode.name)

      return
    }

    if (context.app.$cookies.get('id_token')) {
      const picture = context.app.$cookies.get('userPicture')
      const name = context.app.$cookies.get('userName')
      const uid = context.app.$cookies.get('userUid')
      commit('setUserLoggedIn', {
        userPicture: picture,
        userName: name,
        userUid: uid
      })
    }
  },
  setCoursesList({ commit }, context) {
    return this.$axios({
      method: API.getCoursesList.method,
      url: API.getCoursesList.url
    }).then((response) => {
      let coursesArray = []
      for (const key in response.data) {
        coursesArray.push({
          id: key,
          ...response.data[key]
        })
      }
      coursesArray = coursesArray.sort((a, b) => {
        return a.order > b.order ? 1 : -1
      })
      commit('set_courses', {
        courses: coursesArray
      })
    }).catch((error) => {
      console.log(error.response, 'error')
      console.log('TO DO error')
    })
  },
  saveMemberInfo({ state }, payload) {
    const uid = (payload && payload.userUid) || state.userUid
    const _data = payload || {
      name: state.userName,
      picture: state.userPicture
    }
    return this.$axios({
      method: API.patchMemberInfo.method,
      url: API.patchMemberInfo.url.replace(':user_id.json', uid + '.json'),
      data: {
        ..._data
      }
    }).then((response) => {
      console.log(response.data, 'patchMemberInfo response')
    }).catch((error) => {
      console.log(error, 'error')
    })
  },
  getUserFavorite({ state, commit }, payload) {
    if (!state.isUserLoggedIn) { return }
    const uid = state.userUid
    return this.$axios({
      method: API.getMemberInfo.method,
      url: API.getMemberInfo.url.replace(':user_id.json', uid + '.json') + '?auth=' + this.$cookies.get('id_token')
    }).then((response) => {
      commit('set_userFavorite', response.data.favorite)
      console.log(state.userFavorite, 'state.userFavorite')
    }).catch((error) => {
      console.log(error, 'error')
    })
  },
  updateUserFavorite({ state }, payload) {
    return this.$axios({
      method: API.patchMemberInfo.method,
      url: API.patchMemberInfo.url.replace(':user_id.json', state.userUid + '.json') + '?auth=' + this.$cookies.get('id_token'),
      data: {
        favorite: state.userFavorite
      }
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  async ajaxTest({ commit, getters }, payload) {
    const data = await this.$axios('/api/test')
    console.log(data, 'data.data')
    // getters[_M.SET_CONFIG_URL]
    commit('add_test_data', {
      title: data.data
    })
  }
}

export const namespaced = true
