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
  project_id: string
  project_name?: string
  project_desc?: string
  create_time?: string
  delete_time?: string
}

export type AddProjectForm = ProjectInfo
export type DeleteProjectForm = ProjectInfo

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
