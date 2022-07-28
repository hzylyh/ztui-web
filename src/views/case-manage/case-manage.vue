<template>
  <div class="wrapper">
    <div class="handle-bar">

    </div>

    <div class="case-table">
      <div class="action">
        <ElButton type="primary"
                  @click="handleAddCase">新增</ElButton>
        <ElButton type="primary"
                  @click="handleRunCase">运行</ElButton>
      </div>

      <div class="table">
        <ElTable :data="tableData"
                 @row-click="handleCaseRowClick"
                 @selection-change="handleCaseSelect">
<!--          <ElTableColumn label="用例编号">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <span style="margin-left: 10px">{{ scope.row.case_id }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </ElTableColumn>-->
          <ElTableColumn type="selection" width="55" />
          <ElTableColumn type="index" width="50" />
          <ElTableColumn label="用例名称">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.case_name }}</span>
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn label="用例描述">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.case_desc }}</span>
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn label="创建人">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.case_creator }}</span>
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作">
            <template #default="scope">
              <el-button size="small" @click.stop="handleEditCase(scope.row)">编辑
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click.stop="handleDeleteCase(scope.row)">删除
              </el-button>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </div>
  </div>


  <!--    新增用例 dialog-->
  <div class="add-dialog">
    <ElDialog v-model="addDialogVisible"
              :title="titleMap[action]"
              width="30%">
      <ElForm :label-position="labelPosition"
              label-width="100px"
              :model="caseForm">
        <ElFormItem label="用例名称">
          <ElInput v-model="caseForm.case_name"
                    placeholder="请输入" />
        </ElFormItem>
        <ElFormItem label="用例描述">
          <ElInput v-model="caseForm.case_desc"
                   placeholder="请输入" />
        </ElFormItem>
      </ElForm>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary"
                       @click="handleCaseAction">确认</el-button>
          </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, Ref, ref, watch} from "vue";
import {addCase, deleteCase, editCase, getCaseList} from '@/api/case-manage'
import {
  AddCaseReq,
  CaseInfo,
  CaseListReq,
  DeleteCaseReq,
  ListPageReq,
  ListPOReq,
  PageInfo,
  PageObjectInfo, RunCaseReq
} from "@/api/model";
import {nanoid} from "nanoid";
import {ElMessage, ElMessageBox} from "element-plus";
import {run} from "@/api/engine";
import {getPageList} from "@/api/page-manage";
import {getPageObjectList} from "@/api/page-object-manage";
import {useRouter} from "vue-router";

const router = useRouter()

let tableData = ref()
let addDialogVisible = ref(false)
let labelPosition = ref('right')
let pageOptions: Ref<PageInfo[]> = ref([])
let poOptions: Ref<PageObjectInfo[]> = ref([])
let action = ref('')
const titleMap = reactive({
  'add': '新增用例',
  'edit': '编辑用例',
})

let caseForm: Ref<AddCaseReq> = ref({
  case_id: "",
  case_name: "",
  case_desc: "",
  case_creator: "",
  project_id: ""
})

onMounted(() => {
  initData()
})

// 勾选用例
function handleCaseSelect(val) {

}

// 单行用例被点击时出发
function handleCaseRowClick(row: CaseInfo) {
  console.log(row.case_id)
  localStorage.setItem("caseId", row.case_id)
  router.push({name: 'CaseStepManage'})
}

// 页面初始化数据方法
function initData() {
  queryCaseList()
  queryPageList()
}

async function handlePageChange(pageId: string) {
  console.log(pageId)
  let res = await queryPageObjectList(pageId)
  poOptions.value = res.result
}

// 获取用例列表
function queryCaseList() {
  const reqInfo: CaseListReq = {
    project_id: localStorage.getItem("projectId")
  }
  getCaseList(reqInfo).then(response => {
    tableData.value = response.result

  })
}

// 获取页面列表
function queryPageList() {
  const reqInfo: ListPageReq = {
    project_id: localStorage.getItem("projectId")
  }

  getPageList(reqInfo).then(res => {
    pageOptions.value = res.result
  })
}

// 获取页面对象列表
function queryPageObjectList(pageId: string) {
  const reqInfo: ListPOReq = {
    page_id: pageId
  }

  return getPageObjectList(reqInfo)
}

function handleCaseAction() {
  if (action.value === 'add') {
    handleAddCaseAction()
  } else if (action.value === 'edit') {
    handleEditCaseAction()
  }
}

// 添加用例
function handleAddCase () {
  action.value = 'add'
  addDialogVisible.value = true
}

function handleAddCaseAction() {
  caseForm.value.case_id = nanoid()
  caseForm.value.project_id = localStorage.getItem('projectId')
  addCase(caseForm.value).then(res => {
    addDialogVisible.value = false
    queryCaseList()
  })
}


function handleEditCase(row: CaseInfo) {
  action.value = 'edit'
  addDialogVisible.value = true
  caseForm.value = row
}

function handleEditCaseAction() {
  console.log(action.value)
  console.log('edit')
  editCase(caseForm.value).then(res => {
    addDialogVisible.value = false
    queryCaseList()
  })
}

function handleDeleteCase(row: CaseInfo) {
  let deleteReq: DeleteCaseReq = {
    case_id: row.case_id
  }
  ElMessageBox.confirm(
      '您将删除此用例，是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteCase(deleteReq).then(_ => {
          queryCaseList()
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除失败',
        })
      })

}


function handleRunCase() {
  let runCaseReq : RunCaseReq = {
    project_id: localStorage.getItem("projectId")
  }
  run(runCaseReq).then(res => {
    console.log(res)
  })
}


</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  padding: 10px;
  .handle-bar {

  }

  .case-table {
    height: 100%;
    background: #ffffff;
    .action {
      text-align: right;
      padding: 5px;
    }

    .table {

    }
  }
}
</style>
