export interface Pagination {
  page_size: number;
  current: number;
  total?: number;
}

export interface Sorter {
  name: string;
  direction: 'ascend' | 'descend';
}
