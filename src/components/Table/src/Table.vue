<template>
  <ElTable v-bind="props"></ElTable>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Table',
})
</script>

<script lang="ts" setup>
import {ElTable} from "element-plus";

const props = defineProps({ // 疑问：为啥有的东西能直接接受到
  type: {
    required: false,
    type: String
  }
})
</script>

<style scoped>

</style>