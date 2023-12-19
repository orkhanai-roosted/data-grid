import { RequestGroupBy } from '../enums/request-group-by.enum';

export const GROUP_BY_OPTIONS: Record<RequestGroupBy, { title: string; field: string; displayFields?: string[] }> = {
  [RequestGroupBy.ShiftDate]: {
    title: 'Shift Time',
    field: 'shift_date',
    displayFields: ['shift_date_display'],
  },
  [RequestGroupBy.Event]: {
    title: 'Event',
    field: 'event_id',
    displayFields: ['event_id', 'event_name'],
  },
  [RequestGroupBy.Location]: {
    title: 'Location',
    field: 'location_id',
    displayFields: ['location'],
  },
  [RequestGroupBy.WorkerName]: {
    title: 'Worker Name',
    field: 'worker_id',
    displayFields: ['worker_name'],
  },
};
