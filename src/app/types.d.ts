import { Overwrite } from 'utility-types';
import { SimpleChange } from '@angular/core';




export type Maybe<T> = undefined|null|T
export type TypedChanges<T> = {
  [K in keyof T]: Overwrite<SimpleChange,
    {
      previousValue: T[K]
      currentValue: T[K]
    }>
}
