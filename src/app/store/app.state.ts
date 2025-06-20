import { ActionReducerMap } from '@ngrx/store';

import * as fromVariant from './variant-state';

export interface AppState {
  variant: fromVariant.VariantState;
}

export interface CallState<T> {
  data: T | null;
  loading?: boolean;
  error?: unknown | null;
}

export const appReducer: ActionReducerMap<AppState> = {
  variant: fromVariant.reducer,
};

export const appEffects = [fromVariant.VariantEffects];
