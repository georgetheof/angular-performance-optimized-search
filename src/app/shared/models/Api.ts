export interface Data<T> {
  data: T;
}

export interface SuccessResponse {
  success: boolean;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  error: string;
  message: string | string[];
}

export class ApiError {
  constructor(e: any | ApiError) {
    if (e instanceof ApiError) {
      const { error, statusCode, message } = e;

      this.error = error;
      this.statusCode = statusCode;
      this.message = typeof message === 'string' ? message : message[0];
    } else {
      this.statusCode = e?.error?.statusCode || 800;
      this.error = e?.error?.error || 'Internal server error';

      const message = e?.error?.message;
      this.message = typeof message === 'string' ? message : message[0];
    }
  }
}
