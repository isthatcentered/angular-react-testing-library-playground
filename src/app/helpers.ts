import log from "@isthatcentered/log"

export const doTimes = <T>(times: number, action: (index: number) => T): T[] =>
  Array.from({ length: times }, (_, ind) => action(ind))

export const withLog = (tag: string) => <T extends (...args: any[]) => any>(
  fn: T,
) => {
  return (...args: Parameters<T>): T => {
    log(`${tag}`)(args)
    return fn(...args)
  }
}

export function Log(
  _target: Object,
  _propertyName: string,
  propertyDesciptor: PropertyDescriptor,
): PropertyDescriptor {
  const method = propertyDesciptor.value

  propertyDesciptor.value = function(...args: any[]) {
    log(_propertyName)(args)
    return method.apply(this, args)
  }

  return propertyDesciptor
}
