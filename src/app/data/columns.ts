import { DataGridColumn } from '../types/data-grid-column.type';

export const COLUMNS: DataGridColumn[] = [
  {
    title: 'Worker',
    field: 'worker_name',
    width: 350,
    sortable: true,
  },
  {
    title: 'Event',
    field: 'event_id',
    displayField: 'event_name',
    width: 350,
    sortable: true,
  },
  {
    title: 'Skillset',
    field: 'skillset',
    width: 200,
    sortable: true,
  },
  {
    title: 'Current Hours',
    field: 'current_hours',
    width: 200,
    sortable: true,
  },
  {
    title: 'Remaining Spots',
    field: 'remaining_spots',
    width: 200,
    sortable: true,
  },
  {
    title: 'Shift Time',
    field: 'shift_date',
    displayField: 'shift_date_display',
    width: 200,
    sortable: true,
    isDate: true,
  },
  {
    title: 'Location',
    field: 'location_id',
    displayField: 'location',
    width: 350,
    sortable: true,
  },
  {
    title: 'Submitted',
    field: 'date_added',
    width: 200,
    sortable: true,
  },
  {
    title: 'Request Comments',
    field: 'comment',
    width: 500,
    sortable: false,
  },
];
