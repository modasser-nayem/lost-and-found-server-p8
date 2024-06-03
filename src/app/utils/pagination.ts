/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPaginationQuery } from "../interface/pagination";

function isNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function convertNumber(value: any, defaultValue?: number): number {
  let number = 0;
  if (isNumber(value)) {
    number = Number(value);
  } else if (defaultValue) {
    number = defaultValue;
  }
  return number;
}

export const pagination = (query: TPaginationQuery) => {
  const page: number = convertNumber(query.page, 1);
  const limit: number = convertNumber(query.limit, 20);
  const skip: number = (page - 1) * limit;

  let sortOrder: "asc" | "desc";
  if (
    (query.sortOrder && query.sortOrder === "asc") ||
    query.sortOrder === "desc"
  ) {
    sortOrder = query.sortOrder;
  } else {
    sortOrder = "desc";
  }

  const sortBy: string = query.sortBy ? query.sortBy : "createdAt";

  return {
    page: page,
    limit: limit,
    sortOrder: sortOrder,
    sortBy: sortBy,
    skip: skip,
  };
};
