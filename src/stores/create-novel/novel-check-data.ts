import { Checks, Novel } from '@/shared/';

export interface NovelChecking {
  typeCheck: Checks<Novel>;
  titleCheck: Checks<Novel>;
  subTitleCheck: Checks<Novel>;
  categoryCheck: Checks<Novel>;
  novelTagCheck: Checks<Novel>;
  actorCheck: Checks<Novel>;
  summaryCheck: Checks<Novel>;
  bookCoverCheck: Checks<Novel>;
}
export const novelChecking: NovelChecking = {
  typeCheck: {
    key: 'type',
    essential: true,
    errorMsg: '유형을 선택해 주세요.',
    isError: false,
  },
  titleCheck: {
    key: 'title',
    essential: true,
    errorMsg: '제목을 입력해주세요.',
    isError: false,
  },
  subTitleCheck: {
    key: 'subTitle',
    essential: true,
    errorMsg: '한줄 소개를 입력해주세요.',
    isError: false,
  },
  categoryCheck: {
    key: 'category',
    essential: true,
    errorMsg: '카테고리를 선택해 주세요.',
    isError: false,
  },
  novelTagCheck: {
    key: 'novelTag',
    essential: false,
    errorMsg: '태그를 한가지 이상 만들어주세요.',
    isError: false,
  },
  actorCheck: {
    key: 'actor',
    essential: false,
    errorMsg: '등장인물을 입력해주세요.',
    isError: false,
  },
  summaryCheck: {
    key: 'summary',
    essential: false,
    errorMsg: '줄거리를 입력해주세요.',
    isError: false,
  },
  bookCoverCheck: {
    key: 'bookCover',
    essential: false,
    errorMsg: '북커버를 선택해 주세요.',
    isError: false,
  },
};
