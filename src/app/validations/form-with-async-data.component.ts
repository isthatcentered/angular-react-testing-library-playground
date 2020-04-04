import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@ng-stack/forms';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';




interface User
{
   id: number
   firstname: string
   lastname: string
}

@Injectable( {
   providedIn: 'root',
} )
class UserService
{
   get( id: number )
   {
      return of( <User> {
         id,
         firstname: 'John',
         lastname:  'Rambo',
      } ).pipe( delay( 1000 ) );
   }
}

@Component( {
   selector: 'validations-form-with-async-data',
   template: `
               <ng-template #loading>
                 Wait for it... 🙃
               </ng-template>
               <form *ngIf="user$ | async as user; else loading"
                     [formGroup]="form">
                 <label class="block mb-4">
                   <span>Firstname</span>
                   <input
                     aria-describedby="firstname-errors"
                     appInput
                     formControlName="firstname"
                     type="text"
                   />
                   <span aria-live="polite"
                         id="firstname-errors"
                         class="block">
          <shared-control-errors [control]="form.get('firstname')"></shared-control-errors>
          <span
            class="my-4 block"
            *ngIf="
              form.get('firstname')?.touched &&
              form.get('firstname')?.errors?.required
            "
          >Don't ignore me! 😳</span
          >
        </span>
                 </label>
                 <label class="block mb-4">
                   <span>Lastname</span>
                   <input
                     aria-describedby="lastname-errors"
                     appInput
                     formControlName="lastname"
                     type="text"
                   />
                   <span aria-live="polite"
                         id="lastname-errors"
                         class="block">
          <span
            class="mt-2 mb-4 block"
            *ngIf="
              form.get('lastname')?.touched &&
              form.get('lastname')?.errors?.required
            "
          >Don't ignore me! 😳</span
          >
        </span>
                 </label>
                 <button appButton
                         type="submit">Submit
                 </button>

                 <!--      <examples-form-debug [form]="form.get('firstname')"></examples-form-debug>-->
               </form>
             `,
} )
export class FormWithAsyncDataComponent implements OnInit
{
   form!: FormGroup<Omit<User, 'id'>>;

   user$!: Observable<User>;


   constructor( private _builder: FormBuilder, private _users: UserService )
   {
   }


   ngOnInit(): void
   {
      this.form = this._builder.group( {
         firstname: [ '', [ Validators.required ] ],
         lastname:  [ '', [ Validators.required ] ],
      } );

      this.user$ = this._users
         .get( 1 )
         .pipe( tap( user => this.form.patchValue( user ) ) );
   }
}
