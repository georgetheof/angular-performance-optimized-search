import { ApiError } from '../models';

export const initialCallState = <T>() => ({
  data: null as T,
  loading: false,
  error: null,
});

export const startState = <T = any>(data: T | null = null) => ({
  data,
  loading: true,
  error: null,
});
export const successState = <T = any>(data: T) => ({
  data,
  loading: false,
  error: null,
});
export const errorState = (error: any) => ({
  data: null,
  loading: false,
  error: new ApiError(error),
});
