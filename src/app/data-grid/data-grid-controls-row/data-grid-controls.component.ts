import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { faArrowDown, faArrowUp, faXmark } from '@fortawesome/pro-regular-svg-icons';

import { DataGridColumn } from '../types/data-grid-column.type';

@Component({
  selector: 'app-data-grid-controls',
  templateUrl: './data-grid-controls.component.html',
  styleUrl: './data-grid-controls.component.scss',
})
export class DataGridControlsComponent implements OnInit {
  faXMark = faXmark;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  @Input() sortBy: DataGridColumn[];
  @Output() sortUpdated = new EventEmitter<DataGridColumn[]>();

  @Input() groupByOptions: DataGridColumn[];
  @Input() groupBy: DataGridColumn;
  @Output() groupBySelected = new EventEmitter<DataGridColumn>();

  ngOnInit(): void {
    // Set default sort order
    for (const sortCol of this.sortBy) {
      sortCol.sortOrder = sortCol.sortOrder || 'DESC';
    }
  }

  groupDataBy(selection: MatSelectChange): void {
    this.groupBySelected.emit(selection.value);
  }

  clearGroupBy(event: MouseEvent): void {
    event.stopPropagation();
    this.groupBySelected.emit(null);
  }

  toggleSortingDirection(column: DataGridColumn): void {
    column.sortOrder = column.sortOrder === 'ASC' ? 'DESC' : 'ASC';

    this.sortUpdated.emit(this.sortBy);
  }

  removeSorting(index: number, column: DataGridColumn): void {
    column.sortOrder = null;

    this.sortBy.splice(index, 1);
    this.sortUpdated.emit(this.sortBy);
  }

  clearSorting(): void {
    for (const sortColumn of this.sortBy) {
      sortColumn.sortOrder = null;
    }

    this.sortBy = [];
    this.sortUpdated.emit(this.sortBy);
  }
}
