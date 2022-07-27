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
<!--          <ElTableColumn label="用例模块">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <span style="margin-left: 10px">{{ scope.row.module_name }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </ElTableColumn>-->
<!--          <ElTableColumn label="步骤">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <span style="margin-left: 10px">{{ scope.row.step }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </ElTableColumn>-->
<!--          <ElTableColumn label="po">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <span style="margin-left: 10px">{{ scope.row.po }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </ElTableColumn>-->
<!--          <ElTableColumn label="po属性">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <span style="margin-left: 10px">{{ scope.row.po_attr }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </ElTableColumn>-->
<!--          <ElTableColumn label="输入">-->
<!--            <template #default="scope">-->
<!--              <div style="display: flex; align-items: center">-->
<!--                <span style="margin-left: 10px">{{ scope.row.input_value }}</span>-->
<!--              </div>-->
<!--            </template>-->
<!--          </ElTableColumn>-->
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
              title="新增用例"
              width="30%">
      <ElForm :label-position="labelPosition"
              label-width="100px"
              :model="addCaseForm">
        <ElFormItem label="用例名称">
          <ElInput v-model="addCaseForm.case_name"
                    placeholder="请输入" />
        </ElFormItem>
        <ElFormItem label="用例描述">
          <ElInput v-model="addCaseForm.case_desc"
                   placeholder="请输入" />
        </ElFormItem>
<!--        <el-form-item label="所属模块">-->
<!--          <el-input v-model="addCaseForm.module_name"-->
<!--                    placeholder="请输入" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="步骤">-->
<!--          <el-input v-model="addCaseForm.step"-->
<!--                    placeholder="请输入" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="页面">-->
<!--          <el-select v-model="addCaseForm.page_id"-->
<!--                     @change="handlePageChange"-->
<!--                     placeholder="Select">-->
<!--            <el-option v-for="item in pageOptions"-->
<!--                       :key="item.page_id"-->
<!--                       :label="item.page_name"-->
<!--                       :value="item.page_id"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="页面对象">-->
<!--          <el-select v-model="addCaseForm.po_id"-->
<!--                     placeholder="Select">-->
<!--            <el-option v-for="item in poOptions"-->
<!--                       :key="item.po_id"-->
<!--                       :label="item.po_name"-->
<!--                       :value="item.po_id"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="输入">-->
<!--          <el-input v-model="addCaseForm.input_value"-->
<!--                    placeholder="请输入" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预期">-->
<!--          <el-input v-model="addCaseForm.expect_value"-->
<!--                    placeholder="请输入" />-->
<!--        </el-form-item>-->
      </ElForm>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary"
                       @click="handleAddCaseAction">确认</el-button>
          </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watch} from "vue";
import {addCase, deleteCase, getCaseList} from '@/api/case-manage'
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

let addCaseForm: Ref<AddCaseReq> = ref({
  case_id: "",
  case_name: "",
  case_desc: "",
  case_creator: "",
  // expect_value: "",
  // input_value: "",
  // module_name: "",
  // page_id: "",
  // po_id: "",
  // step: "",
  project_id: ""
})

// watch(
//     [() => addCaseForm.page_id],
//     (val, oldVar) => {
//       console.log(val)
//     },
//     {deep: true}
// )

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

// 添加用例
function handleAddCase () {
  addDialogVisible.value = true
}

function handleAddCaseAction() {
  addCaseForm.value.case_id = nanoid()
  addCaseForm.value.project_id = localStorage.getItem('projectId')
  addCase(addCaseForm.value).then(res => {
    addDialogVisible.value = false
    queryCaseList()
  })
}


function handleEditCase(row: CaseInfo) {
  addDialogVisible.value = true
  addCaseForm.value = row
}

function handleEditCaseAction() {

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
