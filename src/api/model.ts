export interface GetResultReq {

}

export interface CaseListReq {

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
