/*
 * @Description:
 * @Author: hzylyh
 * @Github: https://github.com/hzylyh
 * @Date: 2022/7/11 17:51
 * @Path: src/api/page-object-manage.ts
 */


import {
  AddPOReq,
  DeletePOReq,
  ListPOReq,
  PageInfo, PageObjectInfo
} from "@/api/model";
import {BaseResPromise} from "@/types/http";
import http from "@/utils/http";

// 新增PO接口
export function addPageObject(params: AddPOReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/pageObjectManage/add',
    method: 'post',
    data: params
  })
}

// 删除页面对象接口
export function deletePageObject(params: DeletePOReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/pageObjectManage/delete',
    method: 'post',
    data: params
  })
}

// 修改PO接口
export function editPageObject(params: AddPOReq): BaseResPromise<PageInfo[]> {
  return http.request({
    url: '/pageObjectManage/edit',
    method: 'post',
    data: params
  })
}


// 查询页面对象列表接口
export function getPageObjectList(params: ListPOReq): BaseResPromise<PageObjectInfo[]> {
  return http.request({
    url: '/pageObjectManage/list',
    method: 'post',
    data: params
  })
}
