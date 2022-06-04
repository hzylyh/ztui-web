import http from '@/utils/http'
import {CaseInfoRes, CaseListReq} from "@/api/model";
import {BaseResPromise} from "@/types/http";

export function getCaseList(params: CaseListReq): BaseResPromise<CaseInfoRes> {
  return http.request({
    url: '/caseManage/getCaseList',
    method: 'post',
    data: params
  })
}
