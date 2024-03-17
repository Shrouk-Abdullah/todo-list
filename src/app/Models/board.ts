import { Task } from './task';
export enum BoardTitle {
  MUST_DO = 'MUST DO',
  SHOULD_DO = 'SHOULD DO',
  IF_I_HAVE_TIME = 'IF I HAVE TIME',
}
export interface Board {
  title: BoardTitle;
  diffHours: string;
  tasks: Task[];
}
