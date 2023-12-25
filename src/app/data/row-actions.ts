import { faCheck, faXmark } from '@fortawesome/pro-regular-svg-icons';
import { RequestItem } from '../interfaces/request-item.interface';
import { DataGridRowAction } from '../data-grid/types/data-grid-row-action.type';

export const ROW_ACTIONS: DataGridRowAction<RequestItem>[] = [
  {
    callback: rowData => console.log(rowData),
    faIcon: faCheck,
    iconColor: '#4a9b22',
    tooltip: 'Confirm',
  },
  {
    callback: rowData => console.log(rowData),
    faIcon: faXmark,
    iconColor: '#e23636',
    tooltip: 'Reject',
  },
];
