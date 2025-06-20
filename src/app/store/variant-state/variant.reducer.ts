import { createReducer, on, Action } from '@ngrx/store';
import { Variant } from '../../shared/models';
import { CallState } from '../app.state';
import {
  initialCallState,
  startState,
  successState,
  errorState,
} from '../../shared/helpers/state.helpers';
import * as _actions from './variant.actions';

export interface VariantState {
  variants: Variant[];
  fetchVariantsState: CallState<Variant[]>;
  selectedVariant: Variant | null;
}

const initialState: VariantState = {
  variants: [],
  fetchVariantsState: initialCallState(),
  selectedVariant: null,
};

const variantReducer = createReducer(
  initialState,
  on(_actions.setSelectedVariant, (state, { variant }) => ({
    ...state,
    selectedVariant: variant,
  })),
  on(_actions.updateVariant, (state, { updatedVariant }) => {
    const { variants, selectedVariant } = state;
    const { id: updatedVariantId } = updatedVariant;

    return {
      ...state,
      variants: variants.map((v) =>
        v.id === updatedVariantId ? updatedVariant : v
      ),
      selectedVariant:
        selectedVariant?.id === updatedVariantId
          ? updatedVariant
          : selectedVariant,
    };
  }),
  on(_actions.fetchVariantsStart, (state) => ({
    ...state,
    fetchVariantsState: startState(),
  })),
  on(_actions.fetchVariantsSuccess, (state, { variants }) => ({
    ...state,
    variants: [...state.variants, ...variants],
    fetchVariantsState: successState(variants),
  })),
  on(_actions.fetchVariantsError, (state, { error }) => ({
    ...state,
    fetchVariantsState: errorState(error),
  }))
);

export function reducer(
  state: VariantState | undefined,
  action: Action
): VariantState {
  return variantReducer(state, action);
}
