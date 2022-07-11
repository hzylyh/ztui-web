<template>
  <div class="wrapper">
    <div class="handle-bar">

    </div>

    <div class="case-table">
      <div class="action">
        <ElButton type="primary"
                  @click="handleAddCase">新增</ElButton>
      </div>

      <div class="table">
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
              <el-button size="small" @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDeleteCase(scope.row)">删除
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
        <el-form-item label="用例名称">
          <el-input v-model="addCaseForm.case_name"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属模块">
          <el-input v-model="addCaseForm.module_name"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="步骤">
          <el-input v-model="addCaseForm.step"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="po">
          <el-input v-model="addCaseForm.po"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="po属性">
          <el-input v-model="addCaseForm.po_attr"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="操作">
          <el-input v-model="addCaseForm.input_value"
                    placeholder="请输入" />
        </el-form-item>
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
import {onMounted, Ref, ref} from "vue";
import {addCase, deleteCase, getCaseList} from '@/api/case-manage'
import {AddCaseReq, CaseInfo, CaseListReq, DeleteCaseReq} from "@/api/model";
import {nanoid} from "nanoid";
import {ElMessage, ElMessageBox} from "element-plus";

let tableData = ref()
let addDialogVisible = ref(false)
let labelPosition = ref('right')

let addCaseForm: Ref<AddCaseReq> = ref({
  case_id: "",
  case_name: "",
  expect_value: "",
  input_value: "",
  module_name: "",
  po: "",
  po_attr: "",
  step: ""
})

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
    tableData.value = response.result

  })
}

// 添加用例
function handleAddCase () {
  addDialogVisible.value = true
}

function handleAddCaseAction() {
  addCaseForm.value.case_id = nanoid()
  addCase(addCaseForm.value).then(res => {
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
