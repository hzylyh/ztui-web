<template>
  <div>
    <ElTable></ElTable>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {getCaseList} from '@/api/case-manage'
import {CaseListReq, CaseInfoRes} from "@/api/model";

onMounted(() => {
  initData()
})

// 页面初始化数据方法
function initData() {
  queryCaseList()
}

// 获取用例列表
function queryCaseList() {
  const reqInfo: CaseListReq = {

  }
  getCaseList(reqInfo).then(response => {
    console.log(response)
  })
}



</script>

<style lang="scss" scoped>

</style>
