import { ApiResponse } from '@/types/common';

export const mockApiCall = async <T>(
  mockData: T,
  delay: number = 1000,
  shouldFail: boolean = false,
  errorMessage: string = 'Mock API Error'
): Promise<ApiResponse<T>> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (shouldFail) {
    throw new Error(errorMessage);
  }
  
  return {
    data: mockData,
    message: 'Success',
    success: true,
    status: 200,
    timestamp: new Date().toISOString()
  };
};

export const mockPaginatedApiCall = async <T>(
  mockData: T[],
  page: number = 1,
  pageSize: number = 10,
  delay: number = 1000
): Promise<ApiResponse<{ items: T[]; total: number; page: number; pageSize: number }>> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = mockData.slice(startIndex, endIndex);
  
  return {
    data: {
      items,
      total: mockData.length,
      page,
      pageSize
    },
    message: 'Success',
    success: true,
    status: 200,
    timestamp: new Date().toISOString()
  };
};

export * from './dashboard';
export * from './users';
export * from './orders';
export * from './products';
export * from './customers';
export * from './revenue';
