import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as _actions from './variant.actions';
import { VariantService } from '../../core/services/variant/variant.service';

@Injectable()
export class VariantEffects {
  private actions$ = inject(Actions);
  private variantService = inject(VariantService);

  fetchVariantsStartEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.fetchVariantsStart),
      exhaustMap((data) =>
        this.variantService
          .api()
          .fetchVariants()
          .pipe(
            map((variants) => _actions.fetchVariantsSuccess({ variants })),
            catchError((error) => of(_actions.fetchVariantsError({ error })))
          )
      )
    )
  );
}
