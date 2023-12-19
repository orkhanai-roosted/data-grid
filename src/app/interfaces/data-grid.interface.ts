export interface DataGridColumn {
  title: string;
  field: string;
  displayField?: string;
  width: number;
  sortable: boolean;
  sortOrder?: 'ASC' | 'DESC';
}
