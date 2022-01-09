<template>
  <div class="bg-white py-0.5 shadow fixed top-0 w-full left-0">
    <nav class="max-w-6xl mx-auto px-5 flex justify-between items-center">
      <div class="flex">
        <img src="../assets/img/logo-hiskio.svg" class="w-[100px] h-[50px]">
      </div>
      <div>
        <div class="flex items-center">
          <p class="text-gray-500 mr-3">
            我想開課
          </p>
          <CartSvg class="w-[25px] h-[18px] text-gray-300 mr-3 cursor-pointer" />
          <div v-if="!user" class="flex gap-3 items-center">
            <div class="hidden lg:block">
              <button class="border border-cyan-600 btnStyle text-cyan-600 hover:bg-cyan-50" @onClick="onLogin">
                <span>登入</span>
              </button>
              <button class="bg-cyan-600 text-white btnStyle hover:bg-cyan-500" @onClick="onCreateAccount">
                <span>註冊</span>
              </button>
            </div>
          </div>
          <div v-else>
            <div class="hidden lg:block">
              <figure class="w-[32px] h-[32px]">
                <img class="w-full h-full rounded-full" src="https://via.placeholder.com/150">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CartSvg from '../assets/svg/CartSvg.vue'
export default {
  name: 'MyHeader',

  components: { CartSvg },

  props: {
    user: {
      type: Object
    }
  },

  methods: {
    onLogin() {
      this.$emit('onLogin')
    },
    onLogout() {
      this.$emit('onLogout')
    },
    onCreateAccount() {
      this.$emit('onCreateAccount')
    }
  }
}
</script>
