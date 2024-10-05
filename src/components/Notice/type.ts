export interface NoticeProps {
  visible: boolean;
  handleVisible: () => void;
  handleAlarmItem: (id: number) => void;
}

export enum alarmAction {
  like = 'like',
  comment = 'comment',
  reject = 'reject',
  resolve = 'resolve',
}

export interface NoticeAlarm {
  id: number;
  created_at: string;
  title: string;
  user: string;
  action: alarmAction;
  description?: string;
  is_read: boolean;
}

export interface NoticeAlarmForAction extends NoticeAlarm {
  actionDescription: string;
}
