export interface RequestItem {
  id: number;
  worker_id: number;
  worker_name: string;
  event_id: number;
  event_name: string;
  shift_date_display: string;
  shift_date: Date;
  location_id: number;
  location: string;
  skillset: string;
  current_hours: number;
  remaining_spots: string;
  date_added: string;
  comment: string;
}
