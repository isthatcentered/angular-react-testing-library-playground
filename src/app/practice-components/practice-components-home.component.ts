import { Component, OnInit } from "@angular/core"
import log from "@isthatcentered/log"

@Component({
  selector: "app-practice-components-home",
  template: `
    <showcase name="Tabs">
      <div tabs class="tabs">
        <nav tabControls="Entertainment" class="flex mb-4">
          <button
            activeClasses="text-gray-700 bg-gray-100 focus:bg-gray-200"
            inactiveClasses="text-gray-500 hover:text-gray-700 focus:bg-gray-100"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none "
            tabControl="nils"
          >
            Nils Frahm
          </button>
          <button
            tabControl="agnes"
            activeClasses="text-gray-700 bg-gray-100 focus:bg-gray-200"
            inactiveClasses="text-gray-500 hover:text-gray-700 focus:bg-gray-100"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none "
          >
            Agnes Obel
          </button>
          <button
            tabControl="complex"
            activeClasses="text-gray-700 bg-gray-100 focus:bg-gray-200"
            inactiveClasses="text-gray-500 hover:text-gray-700 focus:bg-gray-100"
            class="mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none "
          >
            Joke
          </button>
        </nav>
        <div tabPanel="nils">
          <p>
            Nils Frahm is a German musician, composer and record producer based
            in Berlin. He is known for combining classical and electronic music
            and for an unconventional approach to the piano in which he mixes a
            grand piano, upright piano, Roland Juno-60, Rhodes piano, drum
            machine, and Moog Taurus.
          </p>
        </div>
        <div tabPanel="agnes">
          <p>
            Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first
            album, Philharmonics, was released by PIAS Recordings on 4 October
            2010 in Europe. Philharmonics was certified gold in June 2011 by the
            Belgian Entertainment Association (BEA) for sales of 10,000 Copies.
          </p>
        </div>
        <div tabPanel="complex">
          <p>
            Fear of complicated buildings:
          </p>
          <p>
            A complex complex complex.
          </p>
        </div>
      </div>
    </showcase>

    <showcase name="Render prop toggle">
      <render-prop-toggle [on]="true" (onToggle)="logEvent('toggle')($event)">
        <ng-template let-on="on" let-toggle="toggle">
          <div class="pb-2">{{ on ? "😍" : "🤯" }}</div>
          <button appButton (click)="toggle()">
            Toggle
          </button>
        </ng-template>
      </render-prop-toggle>
    </showcase>

    <showcase name="Compound toggle">
      <div compound-toggle (onToggle)="logEvent('toggle')($event)">
        <compound-toggle-button></compound-toggle-button>
        <compound-toggle-on>😍</compound-toggle-on>
        <compound-toggle-off>😵</compound-toggle-off>
      </div>
    </showcase>
  `,
  styles: [],
})
export class PracticeComponentsHomeComponent implements OnInit {
  logEvent = (tag: string) => (event: any) => log(tag)(event)

  constructor() {}

  ngOnInit() {}
}
