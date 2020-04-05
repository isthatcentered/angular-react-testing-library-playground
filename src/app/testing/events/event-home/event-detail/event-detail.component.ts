import { Component, Input } from '@angular/core';
import { EventId } from '../events-home.component';




@Component( {
   selector: 'events-item-details',
   template: `
		          <h1>appointment-item-page</h1>
             `,
} )
export class EventDetailsComponent
{
   @Input()
   appointment!: EventId;
}
