import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { DataGridColumn } from './types/data-grid-column.type';
import { DataGridGroupOption } from './types/data-grid-group-option.type';
import { DataGridGroupedData } from './types/data-grid-grouped-data.type';
import { DataGridRowAction } from './types/data-grid-row-action.type';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DataGridComponent<T> implements OnInit {
  @Input() data: T[];
  @Input() columns: DataGridColumn[];
  @Input() sortBy: DataGridColumn[] = [];
  @Input() groupBy: DataGridGroupOption;
  @Input() stickyGroupRows = false;
  @Input() rowActions: DataGridRowAction<T>[];

  allRowsExpanded = false;
  loading = false;

  // Using subject & observable for virtual scroll cdk
  simpleDataSubject = new BehaviorSubject<T[]>([]);
  simpleData$ = this.simpleDataSubject.asObservable();

  set simpleData(data: T[]) {
    this.simpleDataSubject.next(data);
  }
  get simpleData(): T[] {
    return this.simpleDataSubject.value;
  }

  groupedData: DataGridGroupedData<T> = {};

  // KeyValuePipe comparerFn to keep the order
  keyValueNoOrder = () => null;

  ngOnInit(): void {
    this.sortData();
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
    if (!this.data) return;

    this.loading = true;
    this.sortBy = sortBy;

    if (!this.sortBy || !this.sortBy.length || !this.simpleData) {
      this.simpleData = this.copyData();
    } else {
      this.simpleData = this.copyData().sort(this.sort);
    }

    this.groupData();

    this.loading = false;
  }

  groupData(groupBy: DataGridGroupOption = this.groupBy): void {
    if (!this.data) return;

    this.loading = true;
    if (this.groupBy !== groupBy) {
      this.groupBy = groupBy;
      this.groupedData = {};
    }

    if (this.groupBy) {
      const groupedData: DataGridGroupedData<T> = {};
      for (const item of this.simpleData) {
        let key = item[groupBy.field];
        if (groupBy.displayFields && groupBy.displayFields.length) {
          key = groupBy.displayFields.map(df => (df.includes('id') ? '#' + item[df] : item[df])).join(' - ');
        }

        const group = groupedData[key];
        const wasExpanded = this.groupedData && this.groupedData[key] && this.groupedData[key].expanded;
        if (group && group.items) {
          group.items.push(item);
        } else {
          groupedData[key] = {
            expanded: wasExpanded,
            groupedBy: this.groupBy.title,
            items: [item],
          };
        }
      }

      this.groupedData = groupedData;
    }

    this.loading = false;
  }

  private copyData(data: T[] = this.data): T[] {
    return JSON.parse(JSON.stringify(data));
  }

  private sort = (a: T, b: T): number => {
    for (const { field, sortOrder, isDate } of this.sortBy) {
      const aValue = isDate ? new Date(a[field]) : a[field];
      const bValue = isDate ? new Date(b[field]) : b[field];

      if (aValue < bValue) return sortOrder === 'ASC' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'ASC' ? 1 : -1;
    }

    return 0;
  };
}
