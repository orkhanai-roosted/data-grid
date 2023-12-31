import { DataGridColumn } from '../data-grid/types/data-grid-column.type';
import { RequestItem } from '../interfaces/request-item.interface';

export const COLUMNS: DataGridColumn<RequestItem>[] = [
  {
    title: 'Worker Name',
    field: 'worker_name',
    width: 350,
    sortable: true,
    groupable: true,
    groupField: 'worker_id',
    groupKeyFields: ['worker_name'],
  },
  {
    title: 'Event',
    field: 'event_id',
    displayField: 'event_name',
    width: 350,
    sortable: true,
    groupable: true,
    groupKeyFields: ['event_id', 'event_name'],
  },
  {
    title: 'Skillset',
    field: 'skillset',
    width: 200,
    sortable: true,
    groupable: false,
  },
  {
    title: 'Current Hours',
    field: 'current_hours',
    width: 200,
    sortable: true,
    groupable: false,
  },
  {
    title: 'Remaining Spots',
    field: 'remaining_spots',
    width: 200,
    sortable: true,
    groupable: false,
  },
  {
    title: 'Shift Time',
    field: 'shift_date',
    displayField: 'shift_date_display',
    width: 200,
    isDate: true,
    sortable: true,
    groupable: true,
    groupKeyFields: ['shift_date_display'],
  },
  {
    title: 'Location',
    field: 'location_id',
    displayField: 'location',
    width: 350,
    sortable: true,
    groupable: true,
    groupKeyFields: ['location'],
  },
  {
    title: 'Submitted',
    field: 'date_added',
    width: 200,
    sortable: true,
    groupable: false,
  },
  {
    title: 'Request Comments',
    field: 'comment',
    width: 500,
    sortable: false,
    groupable: false,
  },
];
