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
<!--        <ElTableColumn label="用例编号">-->
<!--          <template #default="scope">-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <span style="margin-left: 10px">{{ scope.row.case_id }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </ElTableColumn>-->
        <ElTableColumn label="用例名称">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.case_name }}</span>
            </div>
          </template>
        </ElTableColumn>
<!--        <ElTableColumn label="用例模块">-->
<!--          <template #default="scope">-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <span style="margin-left: 10px">{{ scope.row.module_name }}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </ElTableColumn>-->
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
        <ElTableColumn label="操作"
                       width="100">
          <template #default="scope">
            <el-button size="small"
                       link
                       type="primary"
                       v-if="scope.row.result === '1'"
                       @click="handleCheckResult(scope.row)">查看异常
            </el-button>
<!--            <el-button-->
<!--                size="small"-->
<!--                type="danger"-->
<!--                @click="handleDeleteCase(scope.row)">删除-->
<!--            </el-button>-->
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
import {Action, ElMessage, ElMessageBox} from 'element-plus'

const btRef = ref('')
const router = useRouter()

const tableData: Ref<CaseResultRes[]> = ref([])
let panelInfo: Ref<PanelInfo> = ref({
  last_run_time: "",
  case_num: "",
  success_num: "",
  fail_num: ""
})

let startTime: string = ''

onMounted(() => {
  initData()

})

async function initData() {
  // debugger
  await queryPanelInfo()
  await queryCaseResult()
}

async function queryPanelInfo () {
  const reqInfo: GetPanelInfoReq = {
    project_id: localStorage.getItem("projectId")
  }
  // debugger
  let response = await getPanelInfo(reqInfo)
  panelInfo.value = response.result
  // debugger
  startTime = response.result.last_run_time
}

async function queryCaseResult() {
  const reqInfo: CaseResultReq = {
    "start_time": startTime
  }
  let response = await getCaseResult(reqInfo)
  tableData.value = response.result
}

function handleCheckResult(caseResult: CaseResultRes) {
  ElMessageBox.alert(caseResult.message, '异常信息', {
    // if you want to disable its autofocus
    // autofocus: false,
    // confirmButtonText: 'OK',
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: '关闭',
    // callback: (action: Action) => {
    //   ElMessage({
    //     type: 'info',
    //     message: `action: ${action}`,
    //   })
    // },
  })
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
