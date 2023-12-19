import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { GROUP_BY_OPTIONS } from '../data/group-by-options';
import { RequestGroupBy } from '../enums/request-group-by.enum';
import { DataGridColumn } from '../interfaces/data-grid.interface';
import { RequestItem } from '../interfaces/request-item.interface';

type GroupedData = Record<string, { expanded: boolean; items: RequestItem[] }>;

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input() data: RequestItem[];
  @Input() columns: DataGridColumn[];
  @Input() sortBy: DataGridColumn[] = [];
  @Input() groupBy = RequestGroupBy.ShiftDate;
  @Input() stickyGroupRows = false;

  allRowsExpanded = false;
  loading = false;

  groupedData: GroupedData = {};

  ngOnInit(): void {
    this.groupData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupBy'] && changes['groupBy'].currentValue !== changes['groupBy'].previousValue) {
      this.groupBy = changes['groupBy'].currentValue;
      this.groupData();
    }

    if (changes['sortBy'] && changes['sortBy'].currentValue !== changes['sortBy'].previousValue) {
      this.sortBy = changes['sortBy'].currentValue;
      this.sortData();
    }
  }

  toggleAllRows(): void {
    this.allRowsExpanded = !this.allRowsExpanded;
  }

  addSortColumn(column: DataGridColumn): void {
    column.sortOrder = column.sortOrder === 'DESC' ? 'ASC' : 'DESC';
    if (!this.sortBy.includes(column)) {
      this.sortBy.push(column);
    }
    this.sortData();
  }

  sortData(sortBy: DataGridColumn[] = this.sortBy): void {
    this.sortBy = sortBy;
    if (!this.sortBy.length) {
      this.groupData();
      return;
    }

    this.loading = true;

    for (const { items } of Object.values(this.groupedData)) {
      items.sort((a, b) => {
        for (const { field, sortOrder } of this.sortBy) {
          const aValue = a[field];
          const bValue = b[field];

          if (aValue < bValue) return sortOrder === 'ASC' ? -1 : 1;
          if (aValue > bValue) return sortOrder === 'ASC' ? 1 : -1;
        }

        return 0;
      });
    }

    this.loading = false;
  }

  groupData(groupBy: RequestGroupBy = this.groupBy): void {
    if (!this.data) return;

    this.loading = true;
    this.groupBy = groupBy;

    let groupedData: GroupedData = {};
    const groupOption = GROUP_BY_OPTIONS[groupBy];

    for (const item of this.data) {
      let key = item[groupOption.field];
      if (groupOption.displayFields && groupOption.displayFields.length) {
        key = groupOption.displayFields.map(df => (df === 'event_id' ? '#' + item[df] : item[df])).join(' - ');
      }

      const group = groupedData[key];
      if (group && group.items) {
        group.items.push(item);
      } else {
        groupedData[key] = {
          expanded: false,
          items: [item],
        };
      }
    }

    this.groupedData = groupedData;

    if (this.sortBy.length) {
      this.sortData();
    }

    this.loading = false;
  }
}
