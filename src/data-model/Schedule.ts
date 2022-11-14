export interface ScheduleBase {
  title: string;
  start: Date;
  end: Date;
  desc: string;
}

export interface ScheduleType extends ScheduleBase {
  id: number;
}
