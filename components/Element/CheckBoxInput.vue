<template>
  <div class="checkBox inline-block">
    <input :id="id" v-model="childChecked" type="checkbox" class="hidden">
    <label :for="id" class="relative inline-block w-[18px] h-[18px] cursor-pointer bg-cyan-600 rounded-sm">
      <CheckBoxSvg v-if="childChecked" class="absoluteCenter w-[12px] h-[12px] text-white" />
    </label>
  </div>
</template>

<script>
import CheckBoxSvg from '~/assets/svg/CheckBoxSvg.vue'
export default {
  components: {
    CheckBoxSvg
  },
  props: {
    id: { type: String, default: '' },
    checked: { type: Boolean }
  },
  data() {
    return {
      childChecked: this.checked
    }
  },
  watch: {
    childChecked() {
      this.$emit('update:checked', this.checked)
    },
    checked() {
      this.childChecked = this.checked
    }
  }
}
</script>

<style>

</style>
