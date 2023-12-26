import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type DataGridRowAction<T> = {
  callback?: (rowData: T) => void;
  label?: string;
  faIcon?: IconDefinition;
  tooltip?: string;
  iconColor?: string;
  textColor?: string;
  bgColor?: string;
  swal?: {
    config: (rowData: T) => any;
    confirm?: (rowData: T) => void;
    deny?: (rowData: T) => void;
    dismiss?: (rowData: T) => void;
  };
  displayCondition?: (rowData: T) => boolean;
};
