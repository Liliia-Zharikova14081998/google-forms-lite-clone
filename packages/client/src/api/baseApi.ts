import { createApi } from '@reduxjs/toolkit/query/react';
import { request, ClientError } from 'graphql-request';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export class TypedDocumentString<TResult, TVariables> extends String {
  __apiType?: TResult;
  __apiVariables?: TVariables;

  constructor(value: string) {
    super(value);
  }
}

const graphqlBaseQuery = ({ baseUrl }: { baseUrl: string }): BaseQueryFn<
  { 
    document: string | TypedDocumentString<unknown, unknown>; 
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables?: any 
  },
  unknown,
  { status: number; data: unknown }
> => 
  async ({ document, variables }) => {
    try {
      const result = await request(baseUrl, document.toString(), variables || {});
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return {
          error: { 
            status: error.response.status, 
            data: error.response.errors || 'GraphQL Error' 
          },
        };
      }
      return { 
        error: { 
          status: 500, 
          data: (error as Error).message || 'Unknown error' 
        } 
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Forms', 'Responses'],
  endpoints: () => ({}),
});

export const baseApi = api;