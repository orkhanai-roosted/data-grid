import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faAngleRight, faLayerGroup } from '@fortawesome/pro-regular-svg-icons';

import { DataGridColumn } from '../types/data-grid-column.type';
import { DataGridGroup } from '../types/data-grid-group.type';
import { DataGridRowAction } from '../types/data-grid-row-action.type';

@Component({
  selector: 'app-data-grid-grouped-row',
  templateUrl: './data-grid-grouped-row.component.html',
  styleUrl: './data-grid-grouped-row.component.scss',
})
export class DataGridGroupedRowComponent<T> implements OnChanges {
  faAngleRight = faAngleRight;
  faLayerGroup = faLayerGroup;

  @Input() groupTitle: string;
  @Input() groupData: DataGridGroup<T>;
  @Input() columns: DataGridColumn<T>[];
  @Input() rowActions: DataGridRowAction<T>[];
  @Input() sticky: boolean;
  @Input() allRowsExpanded: boolean;

  toggleRow(): void {
    this.groupData.expanded = !this.groupData.expanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const allRowsExpandedChange = changes['allRowsExpanded'];
    if (allRowsExpandedChange && !changes['groupTitle']) {
      this.groupData.expanded = allRowsExpandedChange.currentValue;
    }
  }
}
