<template>
  <div class="wrapper">
    <div class="panel">
      <div v-for="(item, index) in 4" class="card-container">
        <ElCard shadow="hover"
                class="card">
        </ElCard>
      </div>
    </div>
    <div class="table-container">
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
<!--        <ElTableColumn label="输入">-->
<!--          <template #default="scope">-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <span style="margin-left: 10px">{{ scope.row.input_value }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </ElTableColumn>-->
        <ElTableColumn label="执行结果">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-tag class="ml-2" :type="scope.row.result === '0' ? 'success' : 'danger'">
                {{ scope.row.result === '0' ? '成功' : '失败' }}
              </el-tag>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";
import {CaseResultReq, CaseResultRes, GetResultReq} from "@/api/model";
import {getCaseResult} from "@/api/case-manage";


const btRef = ref('')


const tableData: Ref<CaseResultRes[]> = ref([])

//yi
let c: Ref<number>
c = ref(0)

onMounted(() => {
  initData()

})

function initData() {
  const reqInfo: CaseResultReq = {

  }
  getCaseResult(reqInfo).then(response => {
    tableData.value = response.result
  })
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
.wrapper {
  height: 100%;
  .panel {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    .card-container {
      height: 100%;
      max-width: 25%;
      flex: 0 0 25%;
      //padding-left: 10px;
      //padding-right: 10px;
      .card {
        //width: 100%;
        margin-left: 5px;
        margin-right: 5px;
        height: 100%;
      }
    }
  }
  .table-container {
    margin: 10px 5px;
    height: calc(100% - 150px);
  }
}

</style>
