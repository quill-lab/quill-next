import callApi from '@/shared/utils/fetchWrapper';

import { config } from '@/config/config';

import {
  GetChatHistoryRequest,
  GetChatHistoryResponse,
  GetNovelChaterListRequest,
  GetNovelChaterListResponse,
  GetOneNovelTextResponse,
  GetWriterListAdminRequest,
  GetWriterListAdminResponse,
  GetWriterPostDetailResponse,
  GetWriterWantedListRequest,
  GetWriterWantedListResponse,
  NovelJoinWriteListResponse,
  NovelListRequest,
  NovelListResponse,
  NovelRoomInfoResponse,
  UserListResponse,
  UserResponse,
} from '../../shared';
import { GetCharactersInfoResponse } from '@/interfaces';

const method = 'GET';

/**
 * 소설공방모집글 리스트
 * @param param0 NovelListRequest
 * @returns NovelListResponse
 */
export function novelList({ page, roomState, token }: NovelListRequest) {
  return callApi<NovelListResponse>({
    url: `${config.apiUrl.novelList}?roomStatus=${roomState}&chunkSize=${config.pageSize}&pageNo=${page}`,
    method,
    token,
  });
}

export function getUser() {
  return callApi<UserResponse>({ url: config.apiUrl.getUser, method });
}

export function userList() {
  return callApi<UserListResponse>({ url: config.apiUrl.user, method });
}
/**
 * 소설공방의 기본정보 탭
 * @param roomId 소설공방 번호
 * @returns NovelRoomInfoResponse
 */
export function novelRoomInfo(roomId: number, token: string) {
  return callApi<NovelRoomInfoResponse>({
    url: config.apiUrl.novelRoomInfo(roomId),
    method,
    token,
  });
}
/**
 * 참여중인 작가 리스트
 * @param roomId novel room id
 * @returns NovelJoinWriteListResponse
 */
export function novelJoinWriteList(roomId: number) {
  return callApi<NovelJoinWriteListResponse>({
    url: `${config.apiUrl.novelJoinWriterList}?novelRoomId=${roomId}`,
    method,
  });
}
/**
 * 소설공방 상세페이지의 회차정보
 * @param param0 GetNovelChaterListRequest
 * @returns GetNovelChaterListResponse
 */
export function getNovelChapterList({ novelRoomId, page }: GetNovelChaterListRequest) {
  return callApi<GetNovelChaterListResponse>({
    url: `${config.apiUrl.novelChapterList}?chunkSize=${config.pageSize}&pageNo=${page}&novelRoomId=${novelRoomId}`,
    method,
  });
}

/**
 * 소설공방에서 작가관리를 위한 작가 리스트(공장 주인용)
 * @param param0 GetWriterListAdminRequest
 * @returns GetWriterListAdminResponse
 */
export function getWriterListAdmin({ page, roomId }: GetWriterListAdminRequest) {
  return callApi<GetWriterListAdminResponse>({
    url: `${config.apiUrl.getWriterListAdmin}?novelRoomId=${roomId}&pageNo=${page}&chunkSize=${config.pageSize}`,
    method,
  });
}
/**
 * 작가모집글
 * @returns GetWriterWantedListResponse
 */
export function getWriterWantedList({ page }: GetWriterWantedListRequest) {
  return callApi<GetWriterWantedListResponse>({
    url: `${config.apiUrl.getWriterWantedList}?pageNo=${page}&chunkSize=${6}`,
    method,
  });
}
/**
 * 작가모집글 상세조회
 * @param param0 roomId
 * @returns
 */
export function getWriterPostDetail({ roomId }: { roomId: number }) {
  return callApi<GetWriterPostDetailResponse>({
    url: config.apiUrl.getWriterPostDetail(roomId),
    method,
  });
}
/**
 * 소설 쓰기에서 socket io로 돌아온 id로 특정 소설 채팅 상세조회
 * @param textId 특정 소설(채팅)의 id
 * @returns
 */
export function getOneNovelText(textId: number) {
  return callApi<GetOneNovelTextResponse>({
    url: config.apiUrl.getOneNovelText(textId),
    method,
  });
}
/**
 * 이전 채팅 리스트
 * @param params GetChatHistoryRequest
 * @returns GetChatHistoryResponse
 */
export function getChatHistory(params: GetChatHistoryRequest) {
  return callApi<GetChatHistoryResponse>({
    url: config.apiUrl.getChatHistory(params),
    method,
  });
}

export function getCharactersInfo({ roomId }: { roomId: number }) {
  return callApi<GetCharactersInfoResponse>({
    url: `/novel-room/${roomId}/characters`,
    method,
  });
}
