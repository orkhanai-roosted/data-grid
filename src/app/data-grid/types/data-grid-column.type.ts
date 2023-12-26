export type DataGridColumn = {
  title: string;
  field: string;
  displayField?: string;
  width: number;
  isDate?: boolean;

  prefix?: string;
  suffix?: string;

  sortable: boolean;
  sortOrder?: 'ASC' | 'DESC';

  groupable: boolean;
  groupField?: string;
  groupKeyFields?: string[];
};
