import { Component, Input } from '@angular/core';

import { DataGridRowAction } from '../types/data-grid-row-action.type';

@Component({
  selector: 'app-data-grid-row-action',
  templateUrl: './data-grid-row-action.component.html',
  styleUrl: './data-grid-row-action.component.scss',
})
export class DataGridRowActionComponent<T> {
  @Input() action: DataGridRowAction<T>;
  @Input() rowData: T;
}
