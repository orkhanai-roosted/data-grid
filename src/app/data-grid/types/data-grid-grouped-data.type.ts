import { DataGridGroup } from './data-grid-group.type';

export type DataGridGroupedData<T> = {
  [groupKey: string]: DataGridGroup<T>;
};
