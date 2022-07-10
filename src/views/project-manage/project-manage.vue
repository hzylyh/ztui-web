<template>
  <div class="wrapper">
    <div class="project-wrapper">
      <div class="card-container">
        <div class="add-card"
             @click="handleAddProject">
          <ElIcon class="avatar-uploader-icon"><Plus /></ElIcon>
        </div>
      </div>
      <div v-for="(item, index) in projectList" class="card-container">
        <ElCard shadow="hover"
                @click="handleEnterProject(item.project_id)"
                class="card">
          <template #header>
            <div class="card-header">
              <span>{{ item.project_name }}</span>
              <el-button link
                         type="danger"
                         @click.stop="handleDelProject(item.project_id)"
                         class="button">删除</el-button>
            </div>
          </template>
          <div>项目内容</div>
        </ElCard>
      </div>
    </div>

<!--    新增项目dialog-->
    <div class="add-dialog">
      <ElDialog v-model="addDialogVisible"
                title="新增项目"
                width="30%">
       <ElForm :label-position="labelPosition"
               label-width="100px"
               :model="addProjectForm">
         <el-form-item label="项目名称">
           <el-input v-model="addProjectForm.project_name"
                     placeholder="请输入项目名称" />
         </el-form-item>
         <el-form-item label="项目描述">
           <el-input v-model="addProjectForm.project_desc"
                     placeholder="请输入项目描述" />
         </el-form-item>
       </ElForm>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary"
                       @click="handleAddProjectAction">确认</el-button>
          </span>
        </template>
      </ElDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import { nanoid } from 'nanoid'
import {getCaseList} from '@/api/case-manage'
import {CaseListReq, CaseInfoRes, ProjectListReq, ProjectInfo, AddProjectForm, DeleteProjectForm} from "@/api/model";
import {getProjectList, addProject, deleteProject} from "@/api/project-manage";
import {useRouter} from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'

// let tableData = reactive<Array<CaseInfoRes | string>>([])

const dialogData: AddProjectForm = {
  project_desc: "",
  project_id: "",
  project_name: ""
}

let tableData = ref()
let addDialogVisible = ref(false)
let labelPosition = ref('right')
let addProjectForm: Ref<AddProjectForm> = ref(dialogData)

let projectList: Ref<ProjectInfo[]> = ref([])



const router = useRouter()

onMounted(() => {
  initData()
})

// 页面初始化数据方法
function initData() {
  queryProjectList()
}

// 添加项目
function handleAddProject() {
  addDialogVisible.value = true
}

// 添加项目提交，调用接口
function handleAddProjectAction() {
  addProjectForm.value.project_id = nanoid()
  addProject(addProjectForm.value).then(res => {
    addDialogVisible.value = false
    queryProjectList()
  })
}

// 删除项目
function handleDelProject(projectId: string) {
  const deleteReq: DeleteProjectForm = {
    project_id: projectId
  }
  ElMessageBox.confirm(
      '您将删除此项目，是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteProject(deleteReq).then(_ => {
          queryProjectList()
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

// 进入项目
function handleEnterProject(projectId: number) {
  router.push({ name: 'Dashboard', query: { projectId: projectId } })
}

// 获取项目列表
function queryProjectList() {
  const reqInfo: ProjectListReq = {

  }
  getProjectList(reqInfo).then(response => {
    console.log(response)
    projectList.value = response.result

  })
}



</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  .project-wrapper {
    display: flex;
    flex-wrap: wrap;
    .card-container {
      height: 200px;
      max-width: 25%;
      flex: 0 0 25%;
      //padding-left: 10px;
      //padding-right: 10px;
      .card {
        //width: 100%;
        margin-left: 5px;
        margin-right: 5px;
        height: 100%;
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .add-card {
        display: flex;
        cursor: pointer;
        background: #ffffff;
        font-size: 28px;
        color: #8c939d;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }

  }

  .add-dialog {

  }
}


</style>
