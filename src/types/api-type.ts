export type SuccessResponse<T> = {
  success: true;
  data: T; // required when success
  message?: string;
};

export type ErrorResponse = {
  success: false;
  data?: never; // no data on error
  message: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
