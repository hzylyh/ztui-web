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
        table
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
        <el-form-item label="项目名称">
          <el-input v-model="addPageForm.page_name"
                    placeholder="请输入项目名称" />
        </el-form-item>
<!--        <el-form-item label="项目描述">-->
<!--          <el-input v-model="addPageForm.project_desc"-->
<!--                    placeholder="请输入项目描述" />-->
<!--        </el-form-item>-->
      </ElForm>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary"
                       @click="handleAddPageAction">确认</el-button>
          </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">

import {AddPageReq, DeletePageReq, DetailProjectReq, GetPageReq, POTree} from "@/api/model";
import {onMounted, Ref, ref} from "vue";
import {addPage, deletePage, getPageList} from "@/api/page-manage";
import {getProjectDetail} from "@/api/project-manage";
import type Node from 'element-plus/es/components/tree/src/model/node'
import {ElMessage, ElMessageBox} from "element-plus";
import {nanoid} from "nanoid";

let data: Ref<POTree[]> = ref([])
let addDialogVisible = ref(false)
let labelPosition = ref('right')

let addPageForm: Ref<AddPageReq> = ref({
  page_id: '',
  page_name: '',
  project_id: ''
})

const defaultProps = {
  children: 'children',
  label: 'label',
}

onMounted(() => {
  queryPageList()
})

function handleNodeClick () {

}

// 获取项目信息
function queryProjectList () {

}

// 获取页面列表
function queryPageList () {
  data.value = []
  const pageReq: GetPageReq = {
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
    }
  }

}
</style>
