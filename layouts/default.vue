<template>
  <div>
    <Header
      :title="$t('home.title')"
      @loginClick="loginClick"
      @registeredClick="registeredClick"
    />
    <nuxt />
    <LoginModal
      v-if="openModal"
      :modal-typle="modalTyple"
      :open-modal.sync="openModal"
      @loginModalSubmit="loginModalSubmit"
    />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header/Header.vue'
import Footer from '~/components/Footer/Footer.vue'
import LoginModal from '~/components/Modal/LoginModal.vue'
import API from '~/api.js'
export default {
  components: {
    Header,
    Footer,
    LoginModal
  },
  data() {
    return {
      openModal: true,
      modalTyple: ''
    }
  },
  mounted() {
    if (this.$route.query.id_token && this.$route.query.refresh_token) {
      window.history.replaceState(null, null, window.location.pathname)
    }
  },
  methods: {
    loginClick() {
      this.openModal = !this.openModal
      this.modalTyple = 'login'
    },
    registeredClick() {
      this.openModal = !this.openModal
      this.modalTyple = 'registered'
    },
    loginModalSubmit(data) {
      if (data.modalTyple === 'login') {
        this.$axios({
          method: API.member.login.method,
          url: API.member.login.url,
          baseURL: process.env.google_api_url,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            ...data,
            returnSecureToken: true
          }
        }).then((response) => {
          console.log(response.data)

          this.$store.commit('setUserLoggedIn', {
            id_token: response.data.idToken,
            refresh_token: response.data.refreshToken,
            userUid: response.data.localId,
            userName: response.data.email
          })

          this.$store.dispatch('getUserFavorite')

          this.openModal = false
        }).catch((error) => {
          const code = parseInt(error.response && error.response.status) // 取得status code
          console.log(code)
          console.log(error.response.data) // 取得資料
          console.log('TO DO error !')
        })
      }
      if (data.modalTyple === 'registered') {
        this.$axios({
          method: API.member.registered.method,
          url: API.member.registered.url,
          baseURL: process.env.google_api_url,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            ...data,
            returnSecureToken: true
          }
        }).then((response) => {
          console.log(response.data)
          // 註冊寫入會員資料
          this.$store.dispatch('saveMemberInfo', {
            email: data.email,
            name: data.name,
            userUid: response.data.localId
          })
          this.openModal = false
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>
<style>

</style>
