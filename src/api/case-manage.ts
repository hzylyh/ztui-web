import http from '@/utils/http'
import {AddCaseReq, CaseInfo, CaseListReq, CaseResultReq, CaseResultRes, DeleteCaseReq, EditCaseReq} from "@/api/model";
import {BaseResPromise} from "@/types/http";

export function addCase(params: AddCaseReq): BaseResPromise<CaseInfo[]> {
  return http.request({
    url: '/caseManage/add',
    method: 'post',
    data: params
  })
}

export function deleteCase(params: DeleteCaseReq): BaseResPromise<CaseInfo[]> {
  return http.request({
    url: '/caseManage/delete',
    method: 'post',
    data: params
  })
}

export function editCase(params: EditCaseReq): BaseResPromise<CaseInfo[]> {
  return http.request({
    url: '/caseManage/edit',
    method: 'post',
    data: params
  })
}

export function getCaseList(params: CaseListReq): BaseResPromise<CaseInfo[]> {
  return http.request({
    url: '/caseManage/getCaseList',
    method: 'post',
    data: params
  })
}

export function getCaseResult(params: CaseResultReq): BaseResPromise<CaseResultRes[]> {
  return http.request({
    url: '/caseManage/getCaseResult',
    method: 'post',
    data: params
  })
}
