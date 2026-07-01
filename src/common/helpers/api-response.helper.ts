import { ApiResponse } from '../types/api-response.type';

export const createApiResponse = <T>(
  message: string,
  data: T,
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});
