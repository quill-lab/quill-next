import { BookCover, NovelRoomStatus, RoomType } from './index';

export interface Novel {
  type: RoomType;
  title: string;
  subTitle: string;
  category: number;
  novelTag: string[];
  actor: string;
  summary: string;
  bookCover: BookCover;
}

export interface NovelItem {
  id: string;
  category: { name: string; alias: string };
  tags: string[];
  title: string;
  description: string;
  createdAt: string;
  exitedAt: string;
  completedAt: string;
  synopsis: string;
  role: string;
  contributorCount: number;
  maxContributorCount: number;
  author: { id: string; name: string };
  status: NovelRoomStatus;
}

export interface Member {
  id: string;
  nickname: string;
  role: string;
  writingOrder: number;
  joinedAt: string;
}

export interface StoryArc {
  id: string;
  description: string;
  phase: string;
  phaseAlias: string;
  firstChapterNumber: string;
  lastChapterNumber: string;
  lastModifiedAt: string;
}
