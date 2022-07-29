<!--
 * @Description: 用例步骤管理
 * @Author: hzylyh
 * @Github: https://github.com/hzylyh
 * @Date: 2022/7/24 20:53
 * @Path: src/views/case-step-manage/case-step-manage.vue
-->
<template>
  <div class="wrapper">
    <div class="handle-bar">
    </div>

    <div class="case-step-table">
      <div class="action">
        <ElButton type="primary"
                  @click="handleAddCaseStep">新增</ElButton>
      </div>
      <div class="table">
        <ElTable :data="tableData"
                 @selection-change="handleCaseSelect">
          <ElTableColumn type="index" width="50" />
          <ElTableColumn label="步骤名称">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.step_name }}</span>
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
          <ElTableColumn label="预期">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.expect_value }}</span>
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作">
            <template #default="scope">
              <ElButton size="small" @click="handleEditCaseStep(scope.row)">编辑
              </ElButton>
              <ElButton
                  size="small"
                  type="danger"
                  @click="handleDeleteCaseStep(scope.row)">删除
              </ElButton>
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
              :model="caseStepForm">
        <ElFormItem label="步骤名称">
          <ElInput v-model="caseStepForm.step_name"
                   placeholder="请输入" />
        </ElFormItem>
        <ElFormItem label="输入">
          <ElInput v-model="caseStepForm.input_value"
                   placeholder="请输入" />
        </ElFormItem>
        <ElFormItem label="期望">
          <ElInput v-model="caseStepForm.expect_value"
                   placeholder="请输入" />
        </ElFormItem>
        <ElFormItem label="页面">
          <ElSelect v-model="caseStepForm.page_id"
                    @change="handlePageChange"
                    placeholder="Select">
            <ElOption v-for="item in pageOptions"
                :key="item.page_id"
                :label="item.page_name"
                :value="item.page_id"/>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="页面对象">
          <ElSelect v-model="caseStepForm.po_id"
                     placeholder="Select">
            <ElOption v-for="item in poOptions"
                       :key="item.po_id"
                       :label="item.po_name"
                       :value="item.po_id"/>
          </ElSelect>
        </ElFormItem>
      </ElForm>
      <template #footer>
          <span class="dialog-footer">
            <ElButton @click="addDialogVisible = false">取消</ElButton>
            <ElButton type="primary"
                       @click="handleCaseStepAction">确认</ElButton>
          </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, reactive, Ref, ref} from "vue";
import {
  AddCaseStepReq,
  CaseStepInfo,
  DeleteCaseStepReq,
  ListCaseStepReq,
  ListPageReq,
  ListPOReq,
  PageInfo,
  PageObjectInfo
} from "@/api/model";
import {nanoid} from "nanoid";
import {addCaseStep, deleteCaseStep, editCaseStep, getCaseStepList} from "@/api/case-step-manage";
import {getPageObjectList} from "@/api/page-object-manage";
import {getPageList} from "@/api/page-manage";
import {ElMessage, ElMessageBox} from "element-plus";
import {editCase} from "@/api/case-manage";

const router = useRouter()
let tableData = ref()
let addDialogVisible = ref(false)
let labelPosition = ref('right')
let pageOptions: Ref<PageInfo[]> = ref([])
let poOptions: Ref<PageObjectInfo[]> = ref([])
let action = ref('add')
const titleMap = reactive({
  'add': '新增用例',
  'edit': '编辑用例',
})

let caseStepForm: Ref<AddCaseStepReq> = ref({
  step_id: '',
  step_name: '',
  case_id: '',
  page_id: '',
  po_id: '',
  input_value: '',
  expect_value: '',
})

onMounted(() => {
  initData()
})

// 页面初始化数据方法
function initData() {
  queryCaseStepList()
  queryPageList()
}

function handleCaseStepAction() {
  if (action.value === 'add') {
    handleAddCaseStepAction()
  } else if (action.value === 'edit') {
    handleEditCaseStepAction()
  }
}

// 添加用例
function handleAddCaseStep () {
  action.value = 'add'
  addDialogVisible.value = true
}

function handleAddCaseStepAction() {
  caseStepForm.value.step_id = nanoid()
  caseStepForm.value.case_id = localStorage.getItem('caseId')
  console.log(caseStepForm)
  addCaseStep(caseStepForm.value).then(res => {
    addDialogVisible.value = false
    queryCaseStepList()
  })
}

// 删除用例步骤
function handleDeleteCaseStep(row: CaseStepInfo) {
  let deleteReq: DeleteCaseStepReq = {
    step_id: row.step_id
  }
  ElMessageBox.confirm(
      '您将删除此步骤，是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteCaseStep(deleteReq).then(_ => {
          queryCaseStepList()
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

async function handleEditCaseStep(row: CaseStepInfo) {
  await handlePageChange(row.page_id)
  action.value = 'edit'
  addDialogVisible.value = true
  caseStepForm.value = row
}

function handleEditCaseStepAction() {
  editCaseStep(caseStepForm.value).then(res => {
    addDialogVisible.value = false
    queryCaseStepList()
  })
}

async function handlePageChange(pageId: string) {
  let res = await queryPageObjectList(pageId)
  poOptions.value = res.result
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

// 获取用例步骤列表
function queryCaseStepList() {
  const reqInfo: ListCaseStepReq = {
    case_id: localStorage.getItem("caseId")
  }
  getCaseStepList(reqInfo).then(response => {
    tableData.value = response.result

  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  padding: 10px;
  .handle-bar {

  }
  .case-step-table {
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
