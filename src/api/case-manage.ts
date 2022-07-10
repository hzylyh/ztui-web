import http from '@/utils/http'
import {CaseInfo, CaseInfoRes, CaseListReq, CaseResultReq, CaseResultRes, ProjectInfo} from "@/api/model";
import {BaseResPromise} from "@/types/http";

export function addCase(params: CaseInfo): BaseResPromise<CaseInfoRes[]> {
  return http.request({
    url: '/caseManage/add',
    method: 'post',
    data: params
  })
}

export function getCaseList(params: CaseListReq): BaseResPromise<CaseInfoRes[]> {
  return http.request({
    url: '/caseManage/getCaseList',
    method: 'post',
    data: params
  })
}

export function getCaseResult(params: CaseResultReq): BaseResPromise<ProjectInfo[]> {
  return http.request({
    url: '/caseManage/getCaseResult',
    method: 'post',
    data: params
  })
}
