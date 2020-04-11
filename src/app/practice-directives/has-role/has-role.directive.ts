import {
  Directive,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core"
import { Observable, of, Subject } from "rxjs"
import { distinctUntilChanged, takeUntil, tap } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<{ roles: Array<string> } | undefined> = of(undefined)
}

@Directive({
  selector: "[appHasRole]",
})
export class HasRoleDirective implements OnDestroy, OnInit {
  @Input()
  appHasRole: string = ""

  private _destroy$ = new Subject<void>()

  constructor(
    private _view: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _auth: AuthService,
  ) {}
  ngOnInit(): void {
    this._auth.user$
      .pipe(
        distinctUntilChanged(),
        tap(() => this._view.clear()),
        tap(user => {
          if (this._isAllowed(user)) {
            this._view.createEmbeddedView(this._templateRef)
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this._destroy$.next()
  }

  private _isAllowed(user?: { roles: string[] }): boolean {
    return !!user && user.roles.indexOf(this.appHasRole) > -1
  }
}
