import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowsFromLine, faArrowsToLine, faArrowUpArrowDown } from '@fortawesome/pro-regular-svg-icons';

import { DataGridColumn } from '../../interfaces/data-grid.interface';

@Component({
  selector: 'app-data-grid-header-row',
  templateUrl: './data-grid-header-row.component.html',
  styleUrl: './data-grid-header-row.component.scss',
})
export class DataGridHeaderRowComponent {
  faArrowsFromLine = faArrowsFromLine;
  faArrowsToLine = faArrowsToLine;
  faArrowUpArrowDown = faArrowUpArrowDown;

  @Input() columns: DataGridColumn[];
  @Input() allRowsExpanded: boolean;
  @Output() toggledAllRows = new EventEmitter<void>();

  @Output() sortColumnAdded = new EventEmitter<DataGridColumn>();

  toggleAllRows(): void {
    this.toggledAllRows.emit();
  }

  addSorting(column: DataGridColumn): void {
    this.sortColumnAdded.next(column);
  }
}
