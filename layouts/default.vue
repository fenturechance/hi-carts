<template>
  <div>
    <HeaderArea
      @loginClick="loginClick"
      @registeredClick="registeredClick"
    />
    <div class="bg-gray-100 min-h-screen">
      <nuxt />
    </div>
    <LoginModal
      v-if="openModal"
      :modal-typle="modalTyple"
      :open-modal.sync="openModal"
      :error-response="errorResponse"
      @loginModalSubmit="loginModalSubmit"
    />
    <div v-if="$store.state.loading" class="bg-black/50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <p class="text-white">
        Loading....
      </p>
    </div>
  </div>
</template>
<script>
import HeaderArea from '~/components/Header/HeaderArea.vue'
import LoginModal from '~/components/Modal/LoginModal.vue'
import { API, baseURL } from '~/api.js'
import { toUpperFirst } from '~/assets/js/utils.js'
export default {
  components: {
    HeaderArea,
    LoginModal
  },
  data() {
    const emptyErrorResponse = {
      bool: false,
      text: ''
    }
    return {
      openModal: false,
      modalTyple: '',
      errorResponse: {
        ...emptyErrorResponse
      }
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
    async loginModalSubmit(data) {
      const response = await this.loginFun(data)
      const response2 = await this.fetchUserProfile(response)
      this.errorResponse = { ...this.emptyErrorResponse }
      this.openModal = false
      this.$store.commit('setUserLoggedIn', {
        id_token: response.data.access_token,
        refresh_token: response.data.access_token,
        token_type: response.data.token_type,
        userUid: response2.data.username,
        userName: response2.data.username,
        userPicture: response2.data.avatar
      })
    },
    loginFun(data) {
      return this.$axios({
        method: API.member.login.method,
        url: API.member.login.url,
        baseURL,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          account: data.account,
          password: data.password,
          confirm: data.confirm
        }
      }).then((response) => {
        return response
      }).catch((error) => {
        if (!error.response) { return }
        if (!error.response.data) { return }
        this.errorResponse.text = error.response.data.message.account[0]
        this.errorResponse.bool = true
      })
    },
    fetchUserProfile(response) {
      return this.$axios({
        method: API.member.me.method,
        url: API.member.me.url,
        baseURL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${toUpperFirst(response.data.token_type)} ${response.data.access_token}`
        }
      }).then((response) => {
        return response
      }).catch((error) => {
        if (!error.response) { return }
        if (!error.response.data) { return }
        this.errorResponse.text = error.response.data.message.account[0]
        this.errorResponse.bool = true
      })
    }
  }
}
</script>
<style>

</style>
