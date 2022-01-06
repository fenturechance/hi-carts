<template>
  <div class="bg-white py-0.5 shadow fixed top-0 w-full">
    <nav class="max-w-6xl flex justify-between m-auto items-center">
      <div class="flex">
        <div class="navbar-brand">
          <nuxt-link :to="{ name: 'index' }">
            <Logo class="w-[100px] h-[50px]" />
          </nuxt-link>
        </div>
        <div class="navbar-menu is-active">
          <!-- <Search /> -->
        </div>
      </div>
      <div class="navbar-end is-hidden-mobile">
        <MenuArea
          @loginClick="$emit('loginClick')"
          @registeredClick="$emit('registeredClick')"
        />
      </div>
    </nav>
  </div>
</template>

<script>
import MenuArea from './MenuArea'
// import Search from './Search'
import Logo from '~/components/Logo.vue'

export default {
  name: 'HeaderArea',
  components: {
    // Search
    MenuArea,
    Logo
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  created() {
  }
}
</script>
