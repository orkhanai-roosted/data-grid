import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { DataGridColumn } from './types/data-grid-column.type';
import { DataGridGroupedData } from './types/data-grid-grouped-data.type';
import { DataGridRowAction } from './types/data-grid-row-action.type';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DataGridComponent<T> implements OnChanges {
  @Input() data: T[];
  @Input() columns: DataGridColumn<T>[];
  @Input() sortBy: DataGridColumn<T>[] = [];
  @Input() groupBy: DataGridColumn<T>;
  @Input() stickyGroupRows = false;
  @Input() rowActions: DataGridRowAction<T>[];
  @Input() loading = false;
  @Input() noDataText = 'There is no data to display';

  allRowsExpanded = false;

  // Using subject & observable for virtual scroll cdk
  simpleDataSubject = new BehaviorSubject<T[]>([]);
  simpleData$ = this.simpleDataSubject.asObservable();

  set simpleData(data: T[]) {
    this.simpleDataSubject.next(data);
  }
  get simpleData(): T[] {
    return this.simpleDataSubject.value;
  }

  groupByOptions: DataGridColumn<T>[] = [];
  groupedData: DataGridGroupedData<T> = {};

  // KeyValuePipe comparerFn to keep the order
  keyValueNoOrder = () => null;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const changedColumns = simpleChanges['columns'];
    if (changedColumns && changedColumns.currentValue !== changedColumns.previousValue) {
      this.initGroupByOptions();
    }

    const changedData = simpleChanges['data'];
    if (changedData && changedData.currentValue !== changedData.previousValue) {
      this.initData();
    }
  }

  private initData(): void {
    this.sortData();
  }

  private initGroupByOptions(): void {
    this.groupByOptions = this.columns.filter(col => col.groupable);
  }

  toggleAllRows(): void {
    this.allRowsExpanded = !this.allRowsExpanded;
  }

  addSortColumn(column: DataGridColumn<T>): void {
    column.sortOrder = column.sortOrder === 'DESC' ? 'ASC' : 'DESC';
    if (!this.sortBy.includes(column)) {
      this.sortBy.push(column);
    }
    this.sortData();
  }

  sortData(sortBy: DataGridColumn<T>[] = this.sortBy): void {
    if (!this.data) return;

    this.loading = true;
    this.sortBy = sortBy;

    if (!this.sortBy || !this.sortBy.length || !this.simpleData) {
      this.simpleData = this.copyData();
      this.groupData();
    } else {
      /**
       * Move sort column by which data is grouped to start
       * so the order of the groups are not changed
       * until that sort direction is changed
       */
      const groupSortBy = this.handleGroupSort();

      this.simpleData = this.copyData().sort(this.sort(groupSortBy));
      this.handleGrouping(groupSortBy);
    }

    this.loading = false;
  }

  private handleGroupSort(): DataGridColumn<T>[] | undefined {
    if (!this.groupBy || this.sortBy.length === 1) return this.sortBy;

    const groupKeySortBy = this.sortBy.find(sortCol => sortCol.field === this.groupBy.field);
    if (!groupKeySortBy) return undefined;

    const groupSortBy = [groupKeySortBy, ...this.sortBy.slice()];
    groupSortBy.splice(this.sortBy.indexOf(groupKeySortBy) + 1, 1);
    return groupSortBy;
  }

  private handleGrouping(groupSortBy: DataGridColumn<T>[] | undefined): void {
    if (this.groupBy && this.groupedData && Object.values(this.groupedData).length && !groupSortBy) {
      this.sortGroupItems();
    } else {
      this.groupData();
    }
  }

  sortGroupItems(sortBy: DataGridColumn<T>[] = this.sortBy): void {
    this.loading = true;

    for (const { items } of Object.values(this.groupedData)) {
      items.sort(this.sort(sortBy));
    }

    this.loading = false;
  }

  groupData(groupBy: DataGridColumn<T> = this.groupBy): void {
    if (!this.data) return;

    this.loading = true;
    if (this.groupBy !== groupBy) {
      this.groupBy = groupBy;
      this.groupedData = {};
    }

    if (this.groupBy) {
      const groupedData: DataGridGroupedData<T> = {};
      for (const item of this.simpleData) {
        let groupKey = item[groupBy.groupField || groupBy.field];
        if (groupBy.groupKeyFields && groupBy.groupKeyFields.length) {
          groupKey = groupBy.groupKeyFields.map(df => (df.includes('id') ? '#' + item[df] : item[df])).join(' - ');
        }

        const group = groupedData[groupKey];
        const wasExpanded = this.groupedData && this.groupedData[groupKey] && this.groupedData[groupKey].expanded;
        if (group && group.items) {
          group.items.push(item);
        } else {
          groupedData[groupKey] = {
            expanded: wasExpanded || false,
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

  private sort =
    (sortBy: DataGridColumn<T>[] = this.sortBy) =>
    (a: T, b: T): number => {
      for (const { field, sortOrder, isDate } of sortBy) {
        const aValue = isDate ? new Date(a[field]) : a[field];
        const bValue = isDate ? new Date(b[field]) : b[field];

        if (aValue < bValue) return sortOrder === 'ASC' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'ASC' ? 1 : -1;
      }

      return 0;
    };
}
