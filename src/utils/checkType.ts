export class CheckType {
  static getType(v: unknown): string {
    return Object.prototype.toString.call(v)
  }

  static getTypeof(v: unknown): string {
    return typeof v
  }

  static isObject(v: unknown): boolean {
    return CheckType.getType(v) === '[object Object]'
  }

  static isArray(v: unknown): boolean {
    return CheckType.getType(v) === '[object Array]'
  }

  static isFunction(v: unknown): boolean {
    return CheckType.getType(v) === '[object Function]'
  }

  static isString(v: unknown): boolean {
    return CheckType.getType(v) === '[object String]'
  }

  static isBoolean(v: unknown): boolean {
    return CheckType.getType(v) === '[object Boolean]'
  }

  static isEmptyObj(v: unknown): boolean {
    return CheckType.isObject(v) && !Object.keys(v as Record<string | number | symbol, unknown>).length
  }

  static isEmptyArr(v: unknown): boolean {
    return CheckType.isArray(v) && !(v as Array<unknown>).length
  }

  static isNumber(v: unknown): boolean {
    return CheckType.getType(v) === '[object Number]'
  }

  // 不为 undefined && null
  static isExist(v: unknown): boolean {
    return v !== undefined && v !== null
  }
}
