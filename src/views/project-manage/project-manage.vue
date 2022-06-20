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
          {{ item.project_name }}
        </ElCard>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import {getCaseList} from '@/api/case-manage'
import {CaseListReq, CaseInfoRes, ProjectListReq, ProjectInfo} from "@/api/model";
import {getProjectList} from "@/api/project-manage";
import {useRouter} from "vue-router";

// let tableData = reactive<Array<CaseInfoRes | string>>([])

let tableData = ref()

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
  console.log('add')
}

// 进入项目
function handleEnterProject(projectId: number) {
  router.push({ name: 'Dashboard', query: { projectId: projectId } })
}

// 获取用例列表
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
      }
      .add-card {
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
}


</style>
