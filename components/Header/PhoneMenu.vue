<template>
  <div class="lg:hidden block">
    <img v-if="!openMenu" :src="menu" class="w-[18px] h-[18px] cursor-pointer" @click="toggleMenuFun('open')">
    <CloseBtn v-else class="w-[18px] h-[18px] cursor-pointer" @click="toggleMenuFun('close')" />
    <ul class="fixed w-screen bg-gray-100 left-0 transition-all duration-500 pt-8 px-3" style="height: calc(100vh - 50px)" :class="{ 'top-[50px]': openMenu, 'top-[-100vh]': !openMenu }">
      <template v-if="!$store.state.isUserLoggedIn">
        <li class="liStyle py-3 text-gray-500" @click="$emit('loginClick')">
          {{ $t('login.login') }}
        </li>
        <li class="liStyle py-3 text-cyan-600" @click="$emit('registeredClick')">
          {{ $t('login.register') }}
        </li>
      </template>
      <li v-else class="liStyle border-b border-gray-300 pb-5 pt-3">
        <figure class="w-[32px] h-[32px] flex items-center">
          <img class="w-full h-full rounded-full" :src="$store.state.userPicture">
          <p class="ml-3">
            {{ $store.state.userName }}
          </p>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
import menu from '~/assets/img/menu.svg'
import CloseBtn from '~/assets/svg/CloseBtn.vue'
export default {
  components: {
    CloseBtn
  },
  data() {
    return {
      menu,
      openMenu: false
    }
  },
  methods: {
    toggleMenuFun(type) {
      this.openMenu = type === 'open'
    }
  }
}
</script>

<style scoped>
.liStyle {
  @apply w-full cursor-pointer;
}
</style>
