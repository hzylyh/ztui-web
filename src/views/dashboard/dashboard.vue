<template>
  <div class="wrapper">
    <div class="panel">
      <div class="card-container">
        <ElCard shadow="hover"
                class="card">
          <div class="title">最近运行时间</div>
          <div class="content">{{panelInfo.last_run_time}}</div>
        </ElCard>
      </div>
      <div class="card-container">
        <ElCard shadow="hover"
                class="card">
          <div class="title">用例个数</div>
          <div class="content">{{panelInfo.case_num}}</div>
        </ElCard>
      </div>
      <div class="card-container">
        <ElCard shadow="hover"
                class="card">
          <div class="title">最近运行成功数</div>
          <div class="content">{{panelInfo.success_num}}</div>
        </ElCard>
      </div>
      <div class="card-container">
        <ElCard shadow="hover"
                class="card">
          <div class="title">最近运行失败数</div>
          <div class="content">{{panelInfo.fail_num}}</div>
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
import {CaseResultReq, CaseResultRes, GetPanelInfoReq, PanelInfo} from "@/api/model";
import {getCaseResult} from "@/api/case-manage";
import {useRouter} from "vue-router";
import {getPanelInfo} from "@/api/dashboard";

const btRef = ref('')
const router = useRouter()

const tableData: Ref<CaseResultRes[]> = ref([])
let panelInfo: Ref<PanelInfo> = ref({
  last_run_time: ""
})

//yi
let c: Ref<number>
c = ref(0)

onMounted(() => {
  initData()

})

function initData() {
  queryPanelInfo()
  queryCaseResult()
}

function queryPanelInfo () {
  const reqInfo: GetPanelInfoReq = {
    project_id: localStorage.getItem("projectId")
  }
  getPanelInfo(reqInfo).then(response => {
    console.log(response)
    panelInfo.value = response.result
  })
}

function queryCaseResult() {
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
  padding: 10px;
  .panel {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    .card-container {
      height: 100%;
      flex: 0 0 25%;
      //padding-left: 10px;
      //padding-right: 10px;
      .card {
        //width: 100%;
        margin-left: 5px;
        margin-right: 5px;
        height: 100%;
        .title {
          font-size: 20px;
          text-align: left;
          font-weight: bold;
        }
        .content {
          font-size: 20px;
          margin-top: 18px;
          text-align: center;
        }
      }
    }
  }
  .table-container {
    margin: 10px 5px;
    height: calc(100% - 150px);
  }
}

</style>
