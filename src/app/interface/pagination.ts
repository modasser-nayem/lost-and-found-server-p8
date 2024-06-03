export type TPaginationQuery = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};
