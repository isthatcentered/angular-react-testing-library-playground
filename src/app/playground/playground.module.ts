import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundHomeComponent } from './playground-home/playground-home.component';
import { DynamicTableControlsComponent } from './dynamic-table-controls/dynamic-table-controls.component';


@NgModule({
  declarations: [PlaygroundHomeComponent, DynamicTableControlsComponent],
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }
