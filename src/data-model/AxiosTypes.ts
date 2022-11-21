export interface CustomAxiosResponse<T> {
  data: T;
}

export interface PaginationType {
  total_pages: number;
  prev_page: number | null;
  current_page: number;
  next_page: number | null;
  total_count: number;
}

export interface CustomAxiosResponseWithPagination<T>
  extends CustomAxiosResponse<T> {
  pagination: PaginationType;
}
