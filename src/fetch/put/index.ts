import callApi from 'util/fetchWrapper';

import { config } from '@/config/config';

import {
  ChatComplete,
  NovelChapterTitleRequest,
  NovelPublishRequest,
  NovelWriterSequenceRequest,
  UpdateWriterStateRequest,
} from '../../shared';

const method = 'PUT';
/**
 * 소설공방에서 작가 상태 변경 (공방 주인용)
 * @param userId 유저id
 * @returns boolean
 */
export function updateWriterState({ status, userId }: UpdateWriterStateRequest) {
  return callApi<boolean>({
    url: config.apiUrl.updateWriterState(userId),
    method,
    body: {
      status,
    },
  });
}
/**
 * 채팅으로 보낸 문단을 임시저장에서 완료로 상태변경
 * @param param0 chatId
 * @returns
 */
export function chatComplete({ chatId }: ChatComplete) {
  return callApi<boolean>({
    url: config.apiUrl.chatComplete(chatId),
    method,
    body: { id: chatId },
  });
}
/**
 * 연재하기. 독자에게 공개
 * @param param0 NovelPublishRequest
 * @returns boolean
 */
export function novelPublish({ chapterId }: NovelPublishRequest) {
  return callApi<boolean>({
    url: config.apiUrl.novelPublish(chapterId),
    method,
  });
}
/**
 * 소설공방에서 작가의 순서변경
 * @param body NovelWriterSequenceRequest
 * @returns boolean
 */
export function novelWriterSequence(body: NovelWriterSequenceRequest) {
  return callApi<boolean>({
    url: config.apiUrl.novelWriterSequence,
    method,
    body,
  });
}

export function novelChapterTitle({ chapterId, title }: NovelChapterTitleRequest) {
  return callApi<boolean>({
    url: config.apiUrl.novelChapterTitle(chapterId),
    method,
    body: { title },
  });
}
