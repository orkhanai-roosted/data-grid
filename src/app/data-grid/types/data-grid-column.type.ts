export type DataGridColumn = {
  title: string;
  field: string;
  displayField?: string;
  width: number;
  isDate?: boolean;

  sortable: boolean;
  sortOrder?: 'ASC' | 'DESC';

  groupable: boolean;
  groupField?: string;
  groupKeyFields?: string[];
};
