<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      頁面不存在
    </h1>
    <h1 v-else>
      發生錯誤
    </h1>
    <div>
      {{ error.message }}
    </div>
    <nuxt-link to="/">
      首頁
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
