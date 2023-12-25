import { Component, Input } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/pro-regular-svg-icons';

import { DataGridColumn } from '../types/data-grid-column.type';
import { DataGridRowAction } from '../types/data-grid-row-action.type';

@Component({
  selector: 'app-data-grid-row',
  templateUrl: './data-grid-row.component.html',
  styleUrl: './data-grid-row.component.scss',
})
export class DataGridRowComponent<T> {
  faCheck = faCheck;
  faXmark = faXmark;

  @Input() rowData: T;
  @Input() rowActions: DataGridRowAction<T>[];
  @Input() columns: DataGridColumn[];
}
