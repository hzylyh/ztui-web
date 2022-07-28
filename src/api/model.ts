import exp from "constants";

export interface RunCaseReq {
  project_id: string | null
}

export interface PanelInfo {
  last_run_time: string
  case_num: string
  success_num: string
  fail_num: string
}

export interface GetPanelInfoReq {
  project_id: string | null
}

export interface CaseInfo {

}

export interface CaseListReq {
  project_id: string | null
}

export interface CaseResultReq {

}
export interface CaseResultRes {
  case_id: string,
  module_name: string,
  case_name: string
  start_time: string
  result: string
  message: string
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

export interface ListPageReq {
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
  page_id: string | null
}

// old
// export interface CaseInfo {
//   case_id: string
//   case_name: string
//   module_name: string
//   step: string
//   page_id: string
//   po_id: string
//   input_value: string
//   expect_value: string
//   project_id: string | null
// }

// new
export interface CaseInfo {
  case_id: string
  case_name: string
  case_desc: string
  project_id: string | null
  case_creator: string
}

export type AddCaseReq = CaseInfo

export interface DeleteCaseReq {
  case_id: string
}

export type EditCaseReq = CaseInfo

export interface POTree {
  root?: boolean
  label: string | null | undefined
  id: string | null
  children?: POTree[]
}

export interface CaseStepInfo {
  step_id: string
  step_name: string
  case_id: string | null
  page_id: string
  po_id: string
  input_value: string
  expect_value: string
}

export type AddCaseStepReq = CaseStepInfo

export interface DeleteCaseStepReq {
  step_id: string
}

export interface DeleteCaseStepReq {
  step_id: string
}

export interface ListCaseStepReq {
  case_id: string | null
}
