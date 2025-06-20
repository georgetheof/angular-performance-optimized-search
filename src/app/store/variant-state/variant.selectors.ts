import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectVariantState = (state: AppState) => state.variant;

export const selectVariants = createSelector(
  selectVariantState,
  (variantState) => variantState.variants || []
);

export const selectSelectedVariant = createSelector(
  selectVariantState,
  (variantState) => variantState.selectedVariant
);
