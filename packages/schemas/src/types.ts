export type PaginatedDefaultResult<T> = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: T[];
};

export type FilterAndOptions = {
  filter?: { [key: string]: any };
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    q?: { term?: string; fields?: string | string[] };
    populate?: string[];
  };
};
