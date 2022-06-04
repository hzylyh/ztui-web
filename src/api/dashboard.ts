import http from '@/utils/http'
import {GetResultReq} from "@/api/model";

export function getResult(params: GetResultReq) {
  return http.request({
    url: '/dashboard/getResult',
    method: 'post',
    data: params
  })
}

