/*
 * @Description:
 * @Author: hzylyh
 * @Github: https://github.com/hzylyh
 * @Date: 2022/7/11 20:22
 * @Path: src/api/engine.ts
 */

import {PageInfo, RunCaseReq} from "@/api/model";
import {BaseResPromise} from "@/types/http";
import http from "@/utils/http";

export function run(params: RunCaseReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/engine/run',
    method: 'post',
    data: params
  })
}
