<template>
  <!--  <div>{{ a }}</div>-->
  <!--  <ElButton @click="handleClick">ddd</ElButton>-->
  <!--  <DtTable :table-data="tableData"></DtTable>-->
  <!--  <Button type="primary" round @click="handleClick" size="small" ref="btRef">ggg</Button>-->
  <div>
    <ElButton @click="test('y')">ddd</ElButton>
    <ElTable>
      <ElTableColumn label="用例编号">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="用例名称">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="用例模块">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="结果">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";
import {getResult} from "@/api/dashboard";
import {GetResultReq} from "@/api/model";


const btRef = ref('')

interface TData {
  date: string,
  name: string,
  address?: string
}

const tableData: Array<TData | string> = new Array<TData | string>()

//yi
let c: Ref<number>
c = ref(0)

onMounted(() => {
  initData()

})

function initData() {
  const reqInfo: GetResultReq = {

  }
  // getResult(reqInfo).then(response: TData => {
  //   console.log(response)
  // })
}

function test(arr: Array<Array<number>>, type: string): Array<number> {
  let typeMap: Record<string, number> = {
    'x': 0,
    'y': 1
  }
  let res: Array<number> = []
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][typeMap[type]] > arr[i+1][typeMap[type]]) {
      res = arr[i]
    } else {
      res = arr[i + 1]
    }
  }
  return res
}

function handleClick() {
  console.log('ddd')
  console.log(btRef)
}
</script>

<style lang="scss" scoped>

</style>
