<template>
  <div class="bg-white py-0.5 shadow fixed top-0 w-full left-0">
    <nav class="maxWidth flex justify-between items-center">
      <div class="flex">
        <div>
          <nuxt-link :to="{ name: 'index' }">
            <Logo class="w-[100px] h-[50px]" />
          </nuxt-link>
        </div>
        <div>
          <!-- <Search /> -->
        </div>
      </div>
      <div>
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
<style scoped>
@import '~/assets/css/carts.css';
</style>
