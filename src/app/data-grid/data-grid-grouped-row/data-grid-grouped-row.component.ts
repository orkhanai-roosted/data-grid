import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faAngleRight, faCheck, faXmark } from '@fortawesome/pro-regular-svg-icons';

import { DataGridColumn } from '../../interfaces/data-grid.interface';
import { RequestItem } from '../../interfaces/request-item.interface';

@Component({
  selector: 'app-data-grid-grouped-row',
  templateUrl: './data-grid-grouped-row.component.html',
  styleUrl: './data-grid-grouped-row.component.scss',
})
export class DataGridGroupedRowComponent implements OnChanges {
  faAngleRight = faAngleRight;
  faCheck = faCheck;
  faXmark = faXmark;

  @Input() groupTitle: string;
  @Input() groupData: { expanded: boolean; items: RequestItem[] };
  @Input() columns: DataGridColumn[];
  @Input() sticky: boolean;
  @Input() allRowsExpanded: boolean;

  toggleRow(): void {
    this.groupData.expanded = !this.groupData.expanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const allRowsExpandedChange = changes['allRowsExpanded'];
    if (allRowsExpandedChange) {
      this.groupData.expanded = allRowsExpandedChange.currentValue;
    }
  }
}
