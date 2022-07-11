import exp from "constants";

export interface GetResultReq {

}

export interface CaseInfo {

}

export interface CaseListReq {

}

export interface CaseResultReq {

}
export interface CaseResultRes {
  case_id: string,
  module_name: string,
  case_name: string
  start_time: string
  result: string
}

export interface ProjectListReq {

}

export interface ProjectInfo {
  project_id: string | null
  project_name?: string
  project_desc?: string
  create_time?: string
  delete_time?: string
}

export type AddProjectForm = ProjectInfo
export type DeleteProjectForm = ProjectInfo
export type DetailProjectReq = ProjectInfo

export interface PageInfo {
  page_id: string | null
  page_name?: string
  project_id: string | null
}

export type AddPageReq = PageInfo

export type DeletePageReq = PageInfo

export interface GetPageReq {
  project_id: string | null
}

export interface PageObjectInfo {
  po_id: string | null
  po_name?: string
  locate_type?: string
  locate_value?: string
  action?: string
  page_id: string | null
}

export type AddPOReq = PageObjectInfo
export type DeletePOReq = PageObjectInfo

export interface ListPOReq {
  page_id: string
}


export interface CaseInfoRes {
  caseId: string
  caseName: string
  module: string
  step: string
  po: string
  poAttr: string
  inputValue: string
  expectValue: string
}

export interface POTree {
  root?: boolean
  label: string | null | undefined
  id: string | null
  children?: POTree[]
}
