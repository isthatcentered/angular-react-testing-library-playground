import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@ng-stack/forms';
import log from '@isthatcentered/log';




@Component({
  selector: "app-practice-directive-home",
  template: `
    <showcase name="Carousel">
      <div
        *carousel="
          let image of carouselImages;
          autoplay: carouselAutoplay;
          withDelay: 3000;
          let ctrl = controller;
          let index = index
        "
      >
        <figure>
          <img
            class="rounded-sm shadow-sm mb-2 w-full"
            [alt]="image.alt"
            [src]="image.path"
          />
          <figcaption class="mb-4 italic text-gray-600 text-xs">
            {{ index }} - {{ image.alt }}
          </figcaption>
        </figure>

        <button class="mr-4" (click)="ctrl.prev()">Previous</button>
        <button class="mr-4" (click)="ctrl.next()">Next</button>
        <label class="block">
          <input class="mr-2" type="checkbox" [(ngModel)]="carouselAutoplay" />Autoplay
        </label>
      </div>
    </showcase>

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
  // Unsplash URL API https://source.unsplash.com/
  carouselImages: { path: string; alt: string }[] = [
    {
      path: "https://source.unsplash.com/random/640x280/?mesa,desert",
      alt: "A mesa in the desert",
    },
    {
      path: "https://source.unsplash.com/random/640x280/?mesa,outdoor",
      alt: "A mesa",
    },
    {
      path: "https://source.unsplash.com/random/640x280/?mesa,road",
      alt: "A mesa on the road",
    },
  ]

  carouselAutoplay: boolean = false

  constructor() {}

  ngOnInit() {


    const blah = new FormControl()
    blah.patchValue({hello: "world"})

    log("value")( blah.value );
  }
}
