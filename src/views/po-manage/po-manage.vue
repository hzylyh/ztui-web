<!--
 * @Description:
 * @Author: hzylyh
 * @Github: https://github.com/hzylyh
 * @Date: 2022/7/10 17:17
 * @Path: src/views/po-manage/po-manage.vue
-->
<template>
  <div class="wrapper">
    <ElRow :gutter="10"
           class="po-wrapper">
      <ElCol :span="5"
             class="page-tree">
        <div class="tree">
          <el-tree :data="data"
                   default-expand-all
                   :props="defaultProps"
                   :expand-on-click-node="false"
                   @node-click="handleNodeClick" >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <ElButton v-if="data.root"
                            link
                            size="mini"
                            type="primary"
                            @click="handleAddPage(data)"> 新增 </ElButton>
                  <ElButton link
                            size="mini"
                            type="primary"
                            v-if="!data.root"
                            style="margin-left: 8px"
                            @click="handleRemoveNode(node, data)"> 删除</ElButton>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </ElCol>

      <ElCol :span="19" class="po-content">
        <div class="handle-bar">

        </div>
        <div class="po-table">
          <div class="action">
            <ElButton type="primary"
                      @click="handleAddPO">新增</ElButton>
          </div>
          <div class="table">
            <ElTable :data="tableData">
<!--              <ElTableColumn label="对象ID">-->
<!--                <template #default="scope">-->
<!--                  <div style="display: flex; align-items: center">-->
<!--                    <span style="margin-left: 10px">{{ scope.row.po_id }}</span>-->
<!--                  </div>-->
<!--                </template>-->
<!--              </ElTableColumn>-->
              <ElTableColumn label="对象名称">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.po_name }}</span>
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn label="定位方式">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.locate_type }}</span>
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn label="值">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.locate_value }}</span>
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn label="动作">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.action }}</span>
                  </div>
                </template>
              </ElTableColumn>
              <ElTableColumn label="操作">
                <template #default="scope">
                  <el-button size="small" @click="handleEditPO(scope.row)">编辑
                  </el-button>
                  <el-button
                      size="small"
                      type="danger"
                      @click="handleDeletePO(scope.row)">删除
                  </el-button>
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </div>
      </ElCol>
    </ElRow>
  </div>


  <!--    新增页面dialog-->
  <div class="add-dialog">
    <ElDialog v-model="addDialogVisible"
              title="新增页面"
              width="30%">
      <ElForm :label-position="labelPosition"
              label-width="100px"
              :model="addPageForm">
        <ElFormItem label="页面名称">
          <ElInput v-model="addPageForm.page_name"
                    placeholder="请输入名称" />
        </ElFormItem>
      </ElForm>
      <template #footer>
          <span class="dialog-footer">
            <ElButton @click="addDialogVisible = false">取消</ElButton>
            <ElButton type="primary"
                       @click="handleAddPageAction">确认</ElButton>
          </span>
      </template>
    </ElDialog>
  </div>

  <!--    新增PO dialog-->
  <div class="add-dialog">
    <ElDialog v-model="addPODialogVisible"
              :title="titleMap[action]"
              width="30%">
      <ElForm :label-position="labelPosition"
              label-width="100px"
              :model="pageObjectForm">
        <el-form-item label="对象名称">
          <el-input v-model="pageObjectForm.po_name"
                    placeholder="请输入页面对象名称" />
        </el-form-item>
        <el-form-item label="定位方式">
          <el-input v-model="pageObjectForm.locate_type"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="定位值">
          <el-input v-model="pageObjectForm.locate_value"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item label="操作">
          <el-input v-model="pageObjectForm.action"
                    placeholder="请输入" />
        </el-form-item>
      </ElForm>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="addPODialogVisible = false">取消</el-button>
            <el-button type="primary"
                       @click="handlePOAction">确认</el-button>
          </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">

import {
  AddPageReq,
  AddPOReq,
  DeletePageReq, DeletePOReq,
  DetailProjectReq, ListPageReq,
  ListPOReq,
  PageObjectInfo,
  POTree
} from "@/api/model";
import {onMounted, reactive, Ref, ref} from "vue";
import {addPage, deletePage, getPageList} from "@/api/page-manage";
import {getProjectDetail} from "@/api/project-manage";
import type Node from 'element-plus/es/components/tree/src/model/node'
import {ElMessage, ElMessageBox} from "element-plus";
import {nanoid} from "nanoid";
import {addPageObject, deletePageObject, editPageObject, getPageObjectList} from "@/api/page-object-manage";
import {editCase} from "@/api/case-manage";

let data: Ref<POTree[]> = ref([])
let addDialogVisible = ref(false)
let addPODialogVisible = ref(false)
let labelPosition = ref('right')
let currNode: POTree
let tableData: Ref<PageObjectInfo[]> = ref([])
let action = ref('')
const titleMap = reactive({
  'add': '新增页面对象',
  'edit': '编辑页面对象',
})

let addPageForm: Ref<AddPageReq> = ref({
  page_id: '',
  page_name: '',
  project_id: ''
})

let pageObjectForm: Ref<AddPOReq> = ref({
  po_id: '',
  po_name: '',
  locate_type: '',
  locate_value: '',
  action: '',
  page_id: '',
})

const defaultProps = {
  children: 'children',
  label: 'label',
}

onMounted(() => {
  queryPageList()
})

function handleNodeClick (data: POTree) {
  currNode = data
  if (data.id != null) {
    queryPageObjectList(data.id)
  }
}

// 获取项目信息
function queryProjectList () {

}

function handlePOAction() {
  if (action.value === 'add') {
    handleAddPOAction()
  } else if (action.value === 'edit') {
    handleEditPOAction()
  }
}

// 获取页面列表
function queryPageList () {
  data.value = []
  const pageReq: ListPageReq = {
    project_id: localStorage.getItem('projectId')
  }
  const projectReq: DetailProjectReq = {
    project_id: localStorage.getItem('projectId')
  }
  getProjectDetail(projectReq).then(res => {
    let rootNode: POTree = {
      id: res.result.project_id,
      root: true,
      label: res.result.project_name,
      children: []
    }
    data.value.push(rootNode)
    getPageList(pageReq).then(res => {
      for (let i = 0; i < res.result.length; i++) {
        if (typeof data.value[0].children != "undefined" ) {
          data.value[0].children.push({
            id: res.result[i].page_id,
            label: res.result[i].page_name
          })
        }
      }
    })
  })
}

// 新增页面
function handleAddPage (data: POTree) {
  // addPage()
  addDialogVisible.value = true
}

//
function handleAddPageAction () {
  addPageForm.value.page_id = nanoid()
  addPageForm.value.project_id = localStorage.getItem('projectId')
  addPage(addPageForm.value).then(res => {
    addDialogVisible.value = false
    queryPageList()
  })
}

//
function handleAddPO() {

  action.value = 'add'
  addPODialogVisible.value = true
}

function handleAddPOAction() {
  pageObjectForm.value.page_id = currNode.id
  pageObjectForm.value.po_id = nanoid()
  addPageObject(pageObjectForm.value).then(_ => {
    addPODialogVisible.value = false
    queryProjectList()
    if (currNode.id != null) {
      queryPageObjectList(currNode.id)
    }
  })
}

function queryPageObjectList(pageId: string | null) {
  const listReq: ListPOReq = {
    page_id: pageId
  }
  getPageObjectList(listReq).then(res => {
    console.log(res)
    tableData.value = res.result
  })
}

// 删除页面
function handleRemoveNode (node: Node, data: POTree) {
  const deleteReq: DeletePageReq = {
    page_id: data.id,
    project_id: localStorage.getItem("projectId")
  }
  ElMessageBox.confirm(
      '您将删除此页面，是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deletePage(deleteReq).then(_ => {
          queryPageList()
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

function handleEditPO(row: PageObjectInfo) {
  addPODialogVisible.value = true
  action.value = 'edit'
  pageObjectForm.value = row
}

function handleEditPOAction() {
  editPageObject(pageObjectForm.value).then(res => {
    addPODialogVisible.value = false
    queryPageObjectList(currNode.id)
  })
}

function handleDeletePO(row: PageObjectInfo) {
  const deleteReq: DeletePOReq = {
    po_id: row.po_id,
    page_id: currNode.id
  }
  ElMessageBox.confirm(
      '您将删除此页面对象，是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deletePageObject(deleteReq).then(_ => {
          if (currNode.id != null) {
            queryPageObjectList(currNode.id)
          }
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
$common-bg-color: #fff;
.wrapper {
  height: 100%;
  padding: 10px;
  .po-wrapper {
    height: 100%;
    .page-tree {
      height: 100%;
      .tree {
        height: 100%;
        background: $common-bg-color;
        .custom-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding-right: 8px;
        }
      }
    }
    .po-content {
      height: 100%;
      //background: $common-bg-color;
      .handle-bar {
        background: $common-bg-color;
      }

      .po-table {
        background: $common-bg-color;
        .action {
          text-align: right;
          padding: 5px
        }
      }
    }
  }

}
</style>
