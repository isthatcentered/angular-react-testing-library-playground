import { render } from "../../../testing/helpers"
import { FormControl, FormGroup } from "@ng-stack/forms"
import { CommonModule } from "@angular/common"
import { fakeAsync } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms"
import { prop } from "ramda"
import * as Operators from "rxjs/operators"
import { CVATableComponent } from './cva-table.component';

type TestModel = {
  field1: string
  field2: string
}
describe(`${CVATableComponent}`, () => {
  beforeEach(() => byPassDebounceTime())

  test(`Generates a row per "columns" and the desired "numberOfCols" columns`, async () => {
    const { rows, field1Row, field2Row, props, ...utils } = await makeSut()

    expect(rows.map(prop("header"))).toEqual(props.columns!.map(c => c.label))
    expect(field1Row.values).toHaveLength(props.numberOfCols!)
    expect(field2Row.values).toHaveLength(props.numberOfCols!)
  })

  test(`Assigns initial values to the table`, fakeAsync(async () => {
    const controlDefaultValue = <TestModel[]>[
      {
        field1: "field 1 value",
        field2: "field 2 value",
      },
    ]
    const { rows, field1Row, field2Row, props, ...utils } = await makeSut({
      control: new FormControl<TestModel[]>(controlDefaultValue),
    })

    expect(rows.map(prop("header"))).toEqual(props.columns!.map(c => c.label))
    expect(field1Row.values[0]).toEqual(controlDefaultValue[0].field1)
    expect(field2Row.values[0]).toEqual(controlDefaultValue[0].field2)
  }))

  test(`Changing value in table updates control's value`, async () => {
    const { field1Row, props, type, ...utils } = await makeSut()

    type(field1Row.inputs[0], "new_value")

    expect(props.control!.value).toEqual([
      {
        field1: "new_value",
        field2: "",
      },
    ])
  })

  test(`Changing "makeItem" prop resets table`, async () => {
    const { getRows, props, ...utils } = await makeSut(),
      newMakeItem = jest.fn(
        () =>
          new FormGroup<TestModel>({
            field1: new FormControl("field_1_new_make_item"),
            field2: new FormControl("field_2_new_make_item"),
          }),
      )

    utils.fixture.componentInstance.makeItem = newMakeItem

    utils.fixture.detectChanges()

    const [field1Row, field2Row] = getRows()

    expect(field1Row.values[0]).toEqual("field_1_new_make_item")
    expect(field2Row.values[0]).toEqual("field_2_new_make_item")
  })

  test(`Only assigns valid items to control ???`, () => {
    // any dirty item
  })
})

async function makeSut(
  props?: Partial<
    CVATableComponent<TestModel> & {
      control: FormControl<TestModel[]>
    }
  >,
) {
  const componentProperties: Partial<CVATableComponent<TestModel> & {
    control: FormControl<TestModel[]>
  }> = {
    control: new FormControl<TestModel[]>([]),
    columns: [
      { id: "field1", label: "Field 1" },
      { id: "field2", label: "Field 2" },
    ],
    numberOfCols: 1,
    makeItem: jest.fn(
      () =>
        new FormGroup<TestModel>({
          field1: new FormControl(""),
          field2: new FormControl(""),
        }),
    ),
    ...props,
  }
  const { ...utils } = await render(CVATableComponent, {
    template: `
        <cva-table2 [numberOfCols]="numberOfCols" [makeItem]="makeItem" [columns]="columns" [formControl]="control"></cva-table2>
      `,
    componentProperties,
    imports: [CommonModule, ReactiveFormsModule],
  })

  const getRows = () =>
    Array.from(utils.container.getElementsByTagName("tr")).map(row => {
      const inputs = Array.from(row.getElementsByTagName("input"))
      return {
        header: row
          .getElementsByTagName("th")
          .item(0)!
          .textContent!.trim(),
        values: inputs.map(prop("value")),
        inputs,
      }
    })

  const rows = getRows(),
    [field1Row, field2Row] = rows

  return {
    props: componentProperties,
    rows,
    field1Row,
    field2Row,
    getRows,
    ...utils,
  }
}

function byPassDebounceTime() {
  return jest
    .spyOn(Operators, "debounceTime")
    .mockImplementation(() => observable => observable)
}
