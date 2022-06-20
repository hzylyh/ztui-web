<template>
  <div>
    <ElTable :data="tableData">
      <ElTableColumn label="用例编号">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.case_id }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="用例名称">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.case_name }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="用例模块">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.module_name }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="步骤">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.step }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="po">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.po }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="po属性">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.po_attr }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="输入">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.input_value }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {getCaseList} from '@/api/case-manage'
import {CaseListReq, CaseInfoRes} from "@/api/model";

// let tableData = reactive<Array<CaseInfoRes | string>>([])

let tableData = ref()

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
    tableData.value = response.result

  })
}



</script>

<style lang="scss" scoped>

</style>
