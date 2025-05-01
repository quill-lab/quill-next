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
