<template>
  <div class="flex items-center">
    <p class="text-gray-500 mr-3">
      {{ $t('header.iWantToStart') }}
    </p>
    <nuxt-link :to="{ name: 'carts' }">
      <CartSvg class="w-[25px] h-[18px] text-gray-300 mr-3 cursor-pointer" />
    </nuxt-link>
    <div v-if="!isUserLoggedIn" class="flex gap-3 items-center">
      <div class="hidden lg:block">
        <button class="border border-cyan-600 btnStyle text-cyan-600 hover:bg-cyan-50" @click="$emit('loginClick')">
          <span>{{ $t('login.login') }}</span>
        </button>
        <button class="bg-cyan-600 text-white btnStyle hover:bg-cyan-500" @click="$emit('registeredClick')">
          <span>{{ $t('login.register') }}</span>
        </button>
      </div>
      <PhoneMenu @loginClick="$emit('loginClick')" @registeredClick="$emit('registeredClick')" />
    </div>
    <div v-else>
      <div class="hidden lg:block">
        <figure class="w-[32px] h-[32px]">
          <img class="w-full h-full rounded-full" :src="getUserPicture">
        </figure>
      </div>
      <PhoneMenu @loginClick="$emit('loginClick')" @registeredClick="$emit('registeredClick')" />
    </div>
  </div>
</template>

<script>
import CartSvg from '~/assets/svg/CartSvg.vue'
import PhoneMenu from '~/components/Header/PhoneMenu.vue'
export default {
  name: 'MenuArea',
  components: {
    CartSvg,
    PhoneMenu
  },
  data() {
    return {}
  },
  computed: {
    getUserName() {
      return this.$store.state.userName
    },
    getUserPicture() {
      return this.$store.state.userPicture
    },
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.commit('setUserlogout')
    }
  }
}
</script>
