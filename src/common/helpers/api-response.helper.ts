import { ApiResponse } from '../types/api-response.type';
import { PaginatedData } from '../types/pagination.type';

export const createApiResponse = <T>(
  message: string,
  data: T,
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const createPaginatedData = <T>(
  items: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedData<T> => {
  const totalPages = Math.ceil(total / limit);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
