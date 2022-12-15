export interface ScheduleBase {
  turf_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  require_referee: string;
}

export interface ScheduleCalendar {
  title: string;
  start: Date;
  end: Date;
  desc: string;
}

export interface ScheduleType extends ScheduleBase {
  id: string;
  status: string;
  payment: boolean;
  price: number;
}
