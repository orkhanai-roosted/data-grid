export type DataGridColumn<T> = {
  title: string;
  field: string;
  displayField?: string;
  width: number;
  isDate?: boolean;

  prefix?: string;
  suffix?: string;

  tooltip?: string;
  tooltipFn?: (rowData: T) => string;

  sortable: boolean;
  sortOrder?: 'ASC' | 'DESC';

  groupable: boolean;
  groupField?: string;
  groupKeyFields?: string[];
};
