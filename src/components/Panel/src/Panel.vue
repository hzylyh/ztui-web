<template>
  <ElButton v-bind="props"></ElButton>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Panel',
})
</script>

<script lang="ts" setup>
import {ElButton} from "element-plus";

const props = defineProps({ // 疑问：为啥有的东西能直接接受到
  type: {
    required: false,
    type: String
  }
})
</script>

<style scoped>

</style>