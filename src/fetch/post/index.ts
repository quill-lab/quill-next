import callApi from '@/shared/utils/fetchWrapper';

import { config } from '@/config/config';

import {
  CreateCharacterRequest,
  CreateCharacterResponse,
  CreateRecruitments,
  CreateRoomArg,
  CreateRoomResponse,
  LoginApiArg,
  LoginApiResonse,
  NewNovelTextRequest,
  SignUpRequestModel,
  WriterJoinReqest,
} from '../../shared';

const method = 'POST';

export function checkUserEmail(email: string) {
  return callApi<{ data: { result: boolean } }>({
    url: `${config.apiUrl.user}/check-email`,
    method,
    body: { email },
  });
}

export function checkUserNickname(nickname: string) {
  return callApi<{ data: { result: boolean } }>({
    url: `${config.apiUrl.user}/check-nickname`,
    method,
    body: { nickname },
  });
}

export function CreateRoom(body: CreateRoomArg, token: string | null) {
  return callApi<CreateRoomResponse>({ url: config.apiUrl.createNovelRoom, body, method, token });
}

export function createRecruitments(roomId: string, body: CreateRecruitments, token: string) {
  return callApi({ url: config.apiUrl.createRecruitments(roomId), body, method, token });
}

export function loginApi({ email, password }: LoginApiArg) {
  return callApi<LoginApiResonse>({ url: config.apiUrl.login, body: { email, password }, method });
}

export function signUp({ email, password, nickname }: SignUpRequestModel) {
  return callApi<{ data: { accessToken: string } }>({
    url: config.apiUrl.signUp,
    body: { email, password, nickname },
    method,
  });
}

export function tempPassword({ email }: { email: string }) {
  return callApi<boolean>({
    url: config.apiUrl.tempPassword,
    body: { email },
    method,
  });
}

/**
 * 현재 작성중인 챕터에 글쓰기 api
 * @param body NewNovelTextRequest
 * @returns boolean
 */
export function newNovelText(body: NewNovelTextRequest) {
  return callApi<boolean>({
    url: config.apiUrl.newNovelText,
    body,
    method,
  });
}

export function setBoardLike(body: { novelRoomId: number }) {
  console.log('body', body);
  return callApi<boolean>({
    url: config.apiUrl.setboardLike,
    body,
    method,
  });
}
/**
 * 참여작가로 신청
 * @param body WriterJoinReqest
 * @returns number
 */
export function writerJoinReqest(body: WriterJoinReqest) {
  return callApi<number>({
    url: config.apiUrl.writerJoinRequest,
    body,
    method,
  });
}

export function createCharacter(body: CreateCharacterRequest) {
  return callApi<CreateCharacterResponse>({
    url: config.apiUrl.createCharacter({ roomId: body.roomId }),
    body,
    method,
  });
}
