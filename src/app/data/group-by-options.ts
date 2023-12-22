import { DataGridGroupOption } from '../types/data-grid-group-option.type';

export const GROUP_BY_OPTIONS: DataGridGroupOption[] = [
  {
    title: 'Shift Time',
    field: 'shift_date',
    displayFields: ['shift_date_display'],
  },
  {
    title: 'Event',
    field: 'event_id',
    displayFields: ['event_id', 'event_name'],
  },
  {
    title: 'Location',
    field: 'location_id',
    displayFields: ['location'],
  },
  {
    title: 'Worker Name',
    field: 'worker_id',
    displayFields: ['worker_name'],
  },
];
