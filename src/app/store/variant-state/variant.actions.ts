import { createAction, props } from '@ngrx/store';
import { ApiError, Variant } from '../../shared/models';

export enum VariantActions {
  SET_SELECTED_VARIANT = '[Variant] Set Selected Variant',
  UPDATE_VARIANT = '[Variant] Update Variant',
  FETCH_VARIANTS_START = '[Variant] Fetch Variants Start',
  FETCH_VARIANTS_SUCCESS = '[Variant] Fetch Variants Success',
  FETCH_VARIANTS_ERROR = '[Variant] Fetch Variants Error',
}

export const setSelectedVariant = createAction(
  VariantActions.SET_SELECTED_VARIANT,
  props<{ variant: Variant | null }>()
);

export const updateVariant = createAction(
  VariantActions.UPDATE_VARIANT,
  props<{ updatedVariant: Variant }>()
);

export const fetchVariantsStart = createAction(
  VariantActions.FETCH_VARIANTS_START
);

export const fetchVariantsSuccess = createAction(
  VariantActions.FETCH_VARIANTS_SUCCESS,
  props<{ variants: Variant[] }>()
);

export const fetchVariantsError = createAction(
  VariantActions.FETCH_VARIANTS_ERROR,
  props<{ error: ApiError }>()
);
