/*
 * @Description:
 * @Author: hzylyh
 * @Github: https://github.com/hzylyh
 * @Date: 2022/7/25 10:53
 * @Path: src/api/case-step-manage.ts
 */
import http from '@/utils/http'
import {
  AddCaseStepReq,
  CaseStepInfo,
  DeleteCaseStepReq,
  ListCaseStepReq
} from "@/api/model";
import {BaseResPromise} from "@/types/http";

export function addCaseStep(params: AddCaseStepReq): BaseResPromise<CaseStepInfo[]> {
  return http.request({
    url: '/caseStepManage/add',
    method: 'post',
    data: params
  })
}

export function deleteCaseStep(params: DeleteCaseStepReq): BaseResPromise<CaseStepInfo[]> {
  return http.request({
    url: '/caseStepManage/delete',
    method: 'post',
    data: params
  })
}

export function getCaseStepList(params: ListCaseStepReq): BaseResPromise<CaseStepInfo[]> {
  return http.request({
    url: '/caseStepManage/list',
    method: 'post',
    data: params
  })
}

