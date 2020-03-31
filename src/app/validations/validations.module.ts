import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationsRoutingModule } from './validations-routing.module';
import { ValidationsComponent } from './validations.component';


@NgModule({
  declarations: [ValidationsComponent],
  imports: [
    CommonModule,
    ValidationsRoutingModule
  ]
})
export class ValidationsModule { }
