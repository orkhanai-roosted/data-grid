import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowsFromLine, faArrowsToLine, faArrowUpArrowDown } from '@fortawesome/pro-regular-svg-icons';

import { DataGridColumn } from '../types/data-grid-column.type';

@Component({
  selector: 'app-data-grid-header-row',
  templateUrl: './data-grid-header-row.component.html',
  styleUrl: './data-grid-header-row.component.scss',
})
export class DataGridHeaderRowComponent<T> {
  faArrowsFromLine = faArrowsFromLine;
  faArrowsToLine = faArrowsToLine;
  faArrowUpArrowDown = faArrowUpArrowDown;

  @Input() columns: DataGridColumn<T>[];
  @Input() groupingActive: boolean;
  @Input() allRowsExpanded: boolean;
  @Output() toggledAllRows = new EventEmitter<void>();

  @Output() sortColumnAdded = new EventEmitter<DataGridColumn<T>>();

  toggleAllRows(): void {
    this.toggledAllRows.emit();
  }

  addSorting(column: DataGridColumn<T>): void {
    this.sortColumnAdded.next(column);
  }
}
