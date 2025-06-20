import { ActionReducer, INIT, MetaReducer } from '@ngrx/store';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);

    const { type, ...rest } = action;
    console.log(type, rest);

    return reducer(state, action);
  };
}

export function resetStateMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    if (action?.type === '[Auth] Logout') {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug, resetStateMetaReducer];
