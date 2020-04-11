import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-practice-directive-home",
  template: `
    <showcase name="Toggler directive">
      <ng-template #hint
        >Check the
        <code>DOM</code>
        for
        <code>role</code>
        and
        <code>aria-checked</code>
        attribute</ng-template
      >

      <button class="mb-4" role="waffle" appButton toggler [on]="true">
        Custom role
      </button>
      <br />
      <button class="mb-4" appButton toggler [on]="true">
        on = true
      </button>
      <br />
      <button appButton toggler [on]="false">on = false</button>
    </showcase>

    <showcase name="Padded Value">
      <label class="block">
        <span class="block mb-2">Padded Value</span>
        <input
          placeholder="01234"
          class="block w-full px-3 py-2 rounded border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 shadow-sm"
          [appPaddNumber]="5"
          type="text"
        />
      </label>
    </showcase>
  `,
  styles: [],
})
export class PracticeDirectiveHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
