import http from '@/utils/http'
import {
  AddProjectForm,
  DeleteProjectForm,
  DetailProjectReq,
  ProjectInfo,
  ProjectListReq
} from "@/api/model";
import {BaseResPromise} from "@/types/http";

// 新增项目接口
export function addProject(params: AddProjectForm): BaseResPromise<ProjectInfo[]> {
  return http.request({
    url: '/projectManage/add',
    method: 'post',
    data: params
  })
}

// 删除项目接口
export function deleteProject(params: DeleteProjectForm): BaseResPromise<ProjectInfo[]> {
  return http.request({
    url: '/projectManage/delete',
    method: 'post',
    data: params
  })
}

// 获取项目详情
export function getProjectDetail(params: DetailProjectReq): BaseResPromise<ProjectInfo> {
  return http.request({
    url: '/projectManage/detail',
    method: 'post',
    data: params
  })
}


// 获取项目列表
export function getProjectList(params: ProjectListReq): BaseResPromise<ProjectInfo[]> {
  return http.request({
    url: '/projectManage/getProjectList',
    method: 'post',
    data: params
  })
}
