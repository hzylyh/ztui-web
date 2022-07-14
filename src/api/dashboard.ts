import http from '@/utils/http'
import {GetPanelInfoReq, PanelInfo} from "@/api/model";
import {BaseResPromise} from "@/types/http";

export function getPanelInfo(params: GetPanelInfoReq): BaseResPromise<PanelInfo> {
  return http.request({
    url: '/dashboard/getPanelInfo',
    method: 'post',
    data: params
  })
}

