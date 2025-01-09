export * from './Novel';
export * from './Post';
export * from './Checks';

//TODO: shared에 정리 필요

// attending : 참여중, attendingReject : 참여 반려, attendingReview : 참여 검토, exit : 퇴장
export type WriterStatus = 'attending' | 'reject' | 'review' | 'exit';
export type WriterType = 'host' | 'attendee';
export type NovelStatus = 'writing' | 'review' | 'approve' | 'reject';
// prepare: 연재준비중, series : 연재중, complete : 연재완료, remove : 삭제
export type NovelRoomStatus = 'prepare' | 'series' | 'complete' | 'remove';
// solo : 혼자 ___ group2 : 2명 ___ group3 : 3명
export type RoomType = 1 | 2 | 3 | 4 | 5;
export type RoomStatus = 'attending' | 'apptendApply';
export type ChatStatus = 'temp' | 'complete';
export type BookCover =
  | '/images/book-cover-1.png'
  | '/images/book-cover-2.png'
  | '/images/book-cover-3.png'
  | '/images/book-cover-4.png'
  | '/images/book-cover-5.png';
export interface Pagination {
  totalPage: number;
  chunkSize: number;
  totalCount: number;
}
export interface Categorys {
  id: number;
  name: string;
}
export interface NovelPost {
  id: number;
  type: RoomType;
  title: string;
  category: Categorys;
  currentAttendCnt: number;
  writerCategory: WriterType;
  exitedAt: string | null; // ?
  createdAt: string; // ??
  notifiedAt: number; // ??
  completionAt: string | null;
  status: NovelRoomStatus; // ??
  completedAt: string;
  currentWriter: string;
}
export interface UserList {
  id: number;
  email: string;
  nickname: string;
  createDate: string;
  updateDate: string;
}
export interface SignUpRequestModel {
  email: string;
  nickname: string;
  password: string;
}
export interface LoginApiArg {
  email: string;
  password: string;
}
export interface NovelJoinWriteList {
  id: number;
  writingSeq: null;
  currentlyWriting: null;
  status: WriterStatus;
  nickname: string;
  category: WriterType;
  isLoginUser: boolean;
  user: {
    id: number;
    nickname: string;
    email: string;
  };
}

export interface NovelChapter {
  id: number;
  no: number;
  status: NovelStatus;
  title: string;
  approvalAt: string | null;
  finalAt: string | null;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

export interface GetWriterListAdmin {
  id: number;
  user: Pick<UserList, 'id' | 'nickname'>;
  category: WriterType;
  status: WriterStatus;
  createdAt: string;
  notifiedAt: null;
  exitAt: null;
}
export interface GetWriterWantedList {
  roomId: number;
  roomTitle: string;
  boardTitle: string;
  viewCount: number;
  roomCreatedAt: string;
  likeCount: number;
  category: Categorys;
  currentAttendCnt: number;
  roomType: RoomType;
  host: string;
}

export interface GetWriterPostDetail {
  roomId: number;
  boardTitle: string;
  boardContent: string;
  viewCount: number;
  boardOpenKakaoLink: string;
  likeCount: number;
  hasLike: boolean;
  type: number;
  roomTitle: string;
  isAttend: boolean;
  currentAttendCnt: number;
  createdAt: string | null | undefined;
  host: { id: number; nickname: string };
}
export interface GetOneNovelText {
  createdAt: string;
  updatedAt: string;
  id: number;
  createdBy: Pick<UserList, 'id' | 'nickname'>;
  status: ChatStatus;
  content: string;
  chapterId: number;
}
export interface ChatHistory extends GetOneNovelText {
  createdBy: Pick<UserList, 'id' | 'nickname'>;
}
// -------
export interface LoginApiResonse {
  data: {
    accessToken: string;
    hasRoom: boolean;
    user: {
      id: number;
      nickname: string;
      email: string;
    };
  };
}
export interface NovelListRequest {
  roomState: RoomStatus;
  page: number;
}
export interface NovelListResponse {
  data: NovelPost[];
  meta: Pagination;
}

export interface UserResponse {
  data: {
    id: number;
    nickname: string;
    email: string;
  };
}

export interface CreateRoomArg {
  title?: string;
  subTitle?: string;
  category?: number;
  novelTags?: string[];
  type?: RoomType;
  character?: string;
  summary?: string;
  bookCover?: BookCover;

  attendTitle?: string;
  attendOpenKakaoLink?: string;
  attendContent?: string;
}

export interface UserListResponse {
  data: UserList[];
}

export interface CreateRoomResponse {
  title: string;
  subTitle: string;
  category: number;
  novelTags: string[];
  type: number;
  character: string;
  summary: string;
  attendTitle: string;
  attendOpenKakaoLink: string;
  attendContent: string;
}

export interface NovelRoomInfoResponse {
  data: {
    id: number;
    category: Categorys[];
    character: string;
    summary: string;
    writerStatus: 'host' | 'attendee';
    title: string;
    subTitle: string;
    createdAt: string;
    updatedAt: string;
    bookCover: string;
    novelTag: string[];
  };
}

export interface NovelJoinWriteListResponse {
  data: {
    writers: NovelJoinWriteList[];
    nextWriter: string;
    isHost: boolean;
  };
}

export interface GetNovelChaterListRequest {
  page: number;
  novelRoomId: number;
}

export interface GetNovelChaterListResponse {
  meta: Pagination;
  data: NovelChapter[];
}
export interface GetWriterListAdminRequest {
  roomId: number;
  page: number;
}
export interface GetWriterListAdminResponse {
  data: GetWriterListAdmin[];
}

export interface UpdateWriterStateRequest {
  userId: number;
  status: WriterStatus;
}

export interface GetWriterWantedListResponse {
  data: GetWriterWantedList[];
  meta: Pagination;
}

export interface GetWriterWantedListRequest {
  page: number;
}

export interface GetWriterPostDetailResponse {
  data: GetWriterPostDetail;
  meta: Pagination;
}

export interface NewNovelTextRequest {
  content: string;
  chapterId: number;
}

export interface GetOneNovelTextResponse {
  data: GetOneNovelText;
}

export interface WriterJoinReqest {
  novelRoomId: number;
}
export interface ChatComplete {
  chatId: number;
}

export interface NovelPublishRequest {
  chapterId: number;
}

export interface NovelChapterTitleRequest {
  title: string;
  chapterId: number;
}

export interface NovelWriterSequenceRequest {
  novelRoomId: number;
  writerIdSeq: number[];
}

export interface GetChatHistoryRequest {
  chunkSize: number;
  pageNo: number;
  chapterId: number;
}

export interface GetChatHistoryResponse {
  data: {
    texts: ChatHistory[];
    isNextEnable: boolean;
  };

  meta: Pagination;
}
