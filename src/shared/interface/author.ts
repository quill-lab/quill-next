export interface IApplicantAuthor {
  id: string;
  user_id: string;
  name: string;
  created_at: Date;
}

export interface IParticipatingAuthor {
  id: string;
  nickname: string;
  role: string;
  writingOrder: number;
  joinedAt: Date;
}
