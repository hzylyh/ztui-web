/*
 * @Description:
 * @Author: hzylyh
 * @Github: https://github.com/hzylyh
 * @Date: 2022/7/11 15:09
 * @Path: src/api/page-manage.ts
 */

// 新增页面接口
import {
  AddPageReq,
  DeletePageReq, ListPageReq,
  PageInfo
} from "@/api/model";
import {BaseResPromise} from "@/types/http";
import http from "@/utils/http";

export function addPage(params: AddPageReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/pageManage/add',
    method: 'post',
    data: params
  })
}

// 删除页面接口
export function deletePage(params: DeletePageReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/pageManage/delete',
    method: 'post',
    data: params
  })
}


// 查询页面列表接口
export function getPageList(params: ListPageReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/pageManage/getPageList',
    method: 'post',
    data: params
  })
}
