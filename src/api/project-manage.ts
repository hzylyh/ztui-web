import http from '@/utils/http'
import {CaseInfoRes, CaseListReq, ProjectInfo} from "@/api/model";
import {BaseResPromise} from "@/types/http";

// 新增项目接口
export function addProject(params: CaseListReq): BaseResPromise<CaseInfoRes[]> {
  return http.request({
    url: '/caseManage/getCaseList',
    method: 'post',
    data: params
  })
}


// 获取项目列表
export function getProjectList(params: CaseListReq): BaseResPromise<ProjectInfo[]> {
  return http.request({
    url: '/projectManage/getProjectList',
    method: 'post',
    data: params
  })
}
