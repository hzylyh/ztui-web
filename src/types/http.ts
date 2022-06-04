export interface BaseRes<T> {
  code: string,
  msg: string,
  result: T
}

export type BaseResPromise<T=any> = Promise<BaseRes<T>>
