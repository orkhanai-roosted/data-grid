import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type DataGridRowAction<T> = {
  callback: (rowData: T) => void;
  label?: string;
  faIcon?: IconDefinition;
  tooltip?: string;
  iconColor?: string;
  textColor?: string;
  bgColor?: string;
};
