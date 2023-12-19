import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { faArrowDown, faArrowUp, faQuestionCircle, faXmark } from '@fortawesome/pro-regular-svg-icons';

import { GROUP_BY_OPTIONS } from '../../data/group-by-options';
import { RequestGroupBy } from '../../enums/request-group-by.enum';
import { DataGridColumn } from '../../interfaces/data-grid.interface';

@Component({
  selector: 'app-data-grid-controls',
  templateUrl: './data-grid-controls.component.html',
  styleUrl: './data-grid-controls.component.scss',
})
export class DataGridControlsComponent {
  faXMark = faXmark;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faQuestionCircle = faQuestionCircle;

  groupOptions = GROUP_BY_OPTIONS;

  @Input() sortBy: DataGridColumn[];
  @Output() sortUpdated = new EventEmitter<DataGridColumn[]>();

  @Input() groupBy: RequestGroupBy;
  @Output() groupBySelected = new EventEmitter<RequestGroupBy>();

  groupDataBy(selection: MatSelectChange) {
    this.groupBySelected.emit(selection.value);
  }

  toggleSortingDirection(index: number): void {
    const sortCol = this.sortBy[index];
    sortCol.sortOrder = sortCol.sortOrder === 'ASC' ? 'DESC' : 'ASC';

    this.sortUpdated.emit(this.sortBy);
  }

  removeSorting(index: number, column: DataGridColumn): void {
    column.sortOrder = null;
    this.sortBy.splice(index, 1);
    this.sortUpdated.emit(this.sortBy);
  }
}
