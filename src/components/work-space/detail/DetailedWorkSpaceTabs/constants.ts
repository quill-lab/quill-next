export const TAB_IDS = [
  'work-info',
  'work-plan',
  'writing',
  'work-episodes',
  'author-management',
] as const;

export type TabId = (typeof TAB_IDS)[number];
