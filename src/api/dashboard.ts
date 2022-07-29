import http from '@/utils/http'
import {CaseResultReq, CaseResultRes, GetPanelInfoReq, PanelInfo} from "@/api/model";
import {BaseResPromise} from "@/types/http";

export function getPanelInfo(params: GetPanelInfoReq): BaseResPromise<PanelInfo> {
  return http.request({
    url: '/dashboard/getPanelInfo',
    method: 'post',
    data: params
  })
}

export function getCaseResult(params: CaseResultReq): BaseResPromise<CaseResultRes[]> {
  return http.request({
    url: '/dashboard/getCaseResult',
    method: 'post',
    data: params
  })
}
