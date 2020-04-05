import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { Overwrite } from 'utility-types';
import { By } from '@angular/platform-browser';
import { render as angularTestingLibraryRender } from '@testing-library/angular';
import { RenderComponentOptions, RenderDirectiveOptions } from '@testing-library/angular/lib/models';




export function fake<T>(mock: Partial<T> | string) {
  return mock
}

export function provideFake<T>(config: { type: Type<T>; fake: T }) {
  return {
    provide: config.type,
    useValue: config.fake,
  }
}

export function getByDirective(fixture: ComponentFixture<any>) {
  return <T>(
    component: Type<T>,
  ): Overwrite<DebugElement, { componentInstance: T }> =>
    fixture.debugElement.query(By.directive(component))
}

export function getAllByDirective(fixture: ComponentFixture<any>) {
  return <T>(
    component: Type<T>,
  ): Overwrite<DebugElement, { componentInstance: T }>[] =>
    fixture.debugElement.queryAll(By.directive(component))
}

export function MockClass<T>(service: Type<T>): T {
  return [
    ...Object.getOwnPropertyNames(service.prototype),
    ...Object.getOwnPropertyNames(Object.getPrototypeOf(service.prototype)),
  ]
    .filter(functionName => functionName !== "constructor")
    .reduce((mock, functionName) => {
      ;(mock as any)[functionName] = jest.fn()
      return mock
    }, {}) as T
}

export async function render<ComponentType, WrapperType>(
  component: Type<ComponentType>,
  renderOptions?:
    | RenderComponentOptions<ComponentType>
    | RenderDirectiveOptions<ComponentType, WrapperType>,
) {
  const utils = await angularTestingLibraryRender<ComponentType>(
    component,
    renderOptions,
  )

  return {
    ...utils,
    getByDirective: getByDirective(utils.fixture),
    getAllByDirective: getAllByDirective(utils.fixture),
  }
}

export const scenario = describe
export const context = describe
export const feature = describe

