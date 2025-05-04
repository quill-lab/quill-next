export interface Chapter {
  id: string;
  episode: string;
  title: string;
  editedAt: Date;
  status: 'IN_PROGRESS' | 'REQUESTED' | 'APPROVED' | 'CANCELLED' | 'REJECTED';
  approvedAt: Date;
  currentAuthor: { id: string; name: string };
  metadata: { viewCount: number; commentCount: number; likeCount: number };
}

export interface ChapterText {
  id: string;
  content: string;
  authorName: string;
  createdAt: Date;
}

export interface ChapterFormatted {
  id: string;
  episode: number;
  title: string;
  editedAt: Date;
  status: string;
  approvedAt: Date;
  currentAuthor: string | null;
  metadata: any;
}

export interface DraftText {
  id: string;
  content: string;
  accountId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}
