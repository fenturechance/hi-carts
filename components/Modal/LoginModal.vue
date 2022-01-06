<template>
  <div class="bg-black/80 w-screen h-screen fixed top-0 left-0" :class="[ isOpenModal ? 'is-active' : '', 'modal' ]">
    <div class="max-w-md bg-white h-screen rounded-lg m-auto relative pt-14 px-16 overflow-y-scroll" :style="bgStyle">
      <CloseBtn class="w-[20px] h-[20px] text-gray-500 absolute right-5 top-6" @click="closeModal" />
      <ul class="flex px-4 mb-8">
        <li v-for="tab in tabList" :key="tab.key" class="tabStyle" :class="{ active: nowTab === tab.key }" @click="changeTab(tab.key)">
          <span class="pb-2">{{ tab.text }}</span>
        </li>
      </ul>
      <ul>
        <li v-for="loginMethod in thridPartyLoginList" :key="loginMethod.key" class="thirdPartyLogin">
          <div class="sm:pl-[20%] flex items-center justify-start">
            <img :src="loginMethod.img" class="mr-3">
            <span class="text-gray-450 font-light">{{ loginMethod.text }}</span>
          </div>
        </li>
      </ul>
      <div class="mt-8">
        <p class="text-center text-gray-500 tracking-wide font-light mb-5">
          {{ $t('login.loginWidth', { platform: ` ${$t('login.hiSkioId')} ` }) }}
        </p>
        <form>
          <div class="formItemStyle">
            <input type="text" class="inputStyle" :placeholder="$t('login.pleaseType', { field: $t('login.hiSkioId') })">
            <UsernameSvg class="inputSvg" />
          </div>
          <div class="formItemStyle">
            <input type="password" class="inputStyle" :placeholder="$t('login.pleaseType', { field: $t('login.password') })">
            <PasswordSvg class="inputSvg" />
          </div>
          <div class="flex mt-4">
            <CheckBoxInput id="announcement" :checked.sync="announceBool" />
            <p class="text-gray-400 text-sm ml-2">
              <span>{{ $t('login.announcement') }}</span>
              <span class="underline">{{ $t('login.user') }}</span>
              <span>{{ $t('login.and') }}</span>
              <span class="underline">{{ $t('login.privacyPolicy') }}</span>
            </p>
          </div>
          <button class="mt-5 w-full bg-cyan-600 text-white rounded-lg py-2 cursor-pointer">
            {{ $t('login.login') }}
          </button>
          <p class="text-gray-450 font-light text-center mt-4 mb-4">
            {{ $t('login.forgetPassword') }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CloseBtn from '~/assets/svg/CloseBtn.vue'
import UsernameSvg from '~/assets/svg/UsernameSvg.vue'
import PasswordSvg from '~/assets/svg/PasswordSvg.vue'
import loginBg from '~/assets/img/login-bg.png'
import iconFacebook from '~/assets/img/icon-facebook.svg'
import iconGoogle from '~/assets/img/icon-google.svg'
import iconGithub from '~/assets/img/icon-github.svg'
import iconLinkedin from '~/assets/img/icon-linkedin.svg'
import CheckBoxInput from '~/components/Element/CheckBoxInput.vue'
export default {
  name: 'LoginModal',
  components: {
    CloseBtn,
    UsernameSvg,
    PasswordSvg,
    CheckBoxInput
  },
  props: {
    modalTyple: {
      type: String,
      required: true
    },
    openModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpenModal: this.openModal,
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      emailWithError: null,
      passwordWithError: null,
      nameWithError: null,
      repeatPasswordWithError: null,
      nowTab: 'login',
      bgStyle: {
        backgroundImage: `url('${loginBg}')`
      },
      announceBool: true
    }
  },
  computed: {
    modalTitle() {
      if (this.modalTyple === 'login') {
        return '登入'
      }
      if (this.modalTyple === 'registered') {
        return '註冊'
      }
      return ''
    },
    tabList() {
      return [
        { text: this.$t('login.login'), key: 'login' },
        { text: this.$t('login.register'), key: 'register' }
      ]
    },
    thridPartyLoginList() {
      return [
        { text: this.$t('login.loginWidth', { platform: 'Facebook' }), key: 'facebook', img: iconFacebook },
        { text: this.$t('login.loginWidth', { platform: 'Google' }), key: 'google', img: iconGoogle },
        { text: this.$t('login.loginWidth', { platform: 'Github' }), key: 'github', img: iconGithub },
        { text: this.$t('login.loginWidth', { platform: 'Linkedin' }), key: 'linkedin', img: iconLinkedin }
      ]
    }
  },
  methods: {
    checkForm(e) {
      e.preventDefault()
      this.emailWithError = false
      this.passwordWithError = false
      this.nameWithError = false
      this.repeatPasswordWithError = false
      // 驗證 email、密碼
      // if (this.modalTyple === 'login') {
      //   if (!this.email) { return this.emailWithError = true }
      //   if (!this.password) { return this.passwordWithError = true }
      // }
      // if (this.modalTyple === 'registered') {
      //   if (!this.name) { return this.nameWithError = true }
      //   if (!this.email) { return this.emailWithError = true }
      //   if (!this.password) { return this.passwordWithError = true }
      //   if (this.repeatPassword !== this.password) {
      //     return this.repeatPasswordWithError = true
      //   }
      // }
      this.$emit('loginModalSubmit', {
        modalTyple: this.modalTyple,
        name: this.name,
        email: this.email,
        password: this.password
      })
    },
    closeModal() {
      this.$emit('update:openModal', false)
      // this.isOpenModal = false
    },
    changeTab(tab) {
      this.nowTab = tab
    }
  }
}
</script>
<style scoped>
.tabStyle {
  @apply w-1/2 text-[32px] font-medium text-center text-gray-300 cursor-pointer tracking-wider;
}
.tabStyle.active span{
  @apply border-b-4 border-cyan-600 text-cyan-600;
}
.thirdPartyLogin {
  @apply border py-3 px-4 border-gray-400 rounded-md flex mb-3 items-center;
}
.inputSvg {
  @apply w-[16px] h-[20px] text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2;
}
.inputStyle {
  @apply bg-gray-100 w-full pl-12 py-3 rounded-sm focus:outline-none placeholder:font-light text-sm;
}
.formItemStyle {
  @apply relative mb-2;
}
</style>
