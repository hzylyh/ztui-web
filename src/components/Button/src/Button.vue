<template>
  <ElButton>
    <slot>Button</slot>
  </ElButton>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Button',
})
</script>

<script lang="ts" setup>
import {ElButton} from "element-plus";

const props = defineProps({ // 疑问：为啥有的东西能直接接受到
  dept: {
    type: String
  }
})
defineExpose({
  props
})
</script>

<style scoped>

</style>
