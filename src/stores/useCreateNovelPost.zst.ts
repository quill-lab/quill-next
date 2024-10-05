import { create } from 'zustand';

import { BookCover, RoomType } from '@/shared';

interface Novel {
  type: RoomType;
  title: string;
  subTitle: string;
  category: number;
  novelTag: string[];
  actor: string;
  summary: string;
  bookCover: BookCover;
}

const novel: Novel = {
  type: 2,
  title: '',
  subTitle: '',
  category: 0,
  novelTag: [],
  actor: '',
  summary: '',
  bookCover: '/images/book-cover-1.png',
};

interface Post {
  postTitle: string;
  postContent: string;
  openLink: string;
}

const post: Post = {
  postTitle: '',
  postContent: '',
  openLink: '',
};

interface Checks<T> {
  key: keyof T;
  essential: boolean;
  errorMsg: string;
  isError: boolean;
}

interface NovelChecking {
  titleCheck: Checks<Novel>;
  subTitleCheck: Checks<Novel>;
  categoryCheck: Checks<Novel>;
  novelTagCheck: Checks<Novel>;
  actorCheck: Checks<Novel>;
  summaryCheck: Checks<Novel>;
}
interface PostChecking {
  postTitleCheck: Checks<Post>;
  postContentCheck: Checks<Post>;
  openLinkCheck: Checks<Post>;
}
interface Actions {
  setNovel(data: Partial<Novel>): void;
  setPost(data: Partial<Post>): void;
  setChecking(data: Partial<NovelChecking & PostChecking>): void;
  novelChecking(): boolean;
  postChecking(): boolean;
  // makeBody(): void;
}
const novelChecking: NovelChecking = {
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
    errorMsg: '카테고리를 선택해주세요.',
    isError: false,
  },
  novelTagCheck: {
    key: 'novelTag',
    essential: true,
    errorMsg: '태그를 한가지 이상 만들어주세요.',
    isError: false,
  },
  actorCheck: {
    key: 'actor',
    essential: false,
    errorMsg: '등장인물을 입력해주세요',
    isError: false,
  },
  summaryCheck: {
    key: 'summary',
    essential: false,
    errorMsg: '줄거리를 입력해주세요',
    isError: false,
  },
};

const postChecking: PostChecking = {
  postTitleCheck: {
    key: 'postTitle',
    essential: true,
    errorMsg: '모집 제목을 입력해 주세요.',
    isError: false,
  },
  postContentCheck: {
    key: 'postContent',
    essential: true,
    errorMsg: '최소 30자 이상 작성해 주세요.',
    isError: false,
  },
  openLinkCheck: {
    key: 'openLink',
    essential: true,
    errorMsg: '링크를 입력해 주세요.',
    isError: false,
  },
};
export const useCreateNovelPost = create<Novel & Post & NovelChecking & PostChecking & Actions>()(
  (set, get) => ({
    ...novel,

    ...post,

    ...novelChecking,
    ...postChecking,
    setNovel: data => {
      // 기존 상태와 비교하여 상태가 다를 때만 업데이트
      set(state => {
        // 상태가 변경되지 않았다면 업데이트하지 않음
        // @ts-ignore
        const isStateDifferent = Object.keys(data).some(key => state[key] !== data[key]);

        if (isStateDifferent) {
          return { ...state, ...data };
        }

        return state; // 상태가 변경되지 않았으므로 그대로 유지
      });
    },
    setPost(data) {
      set({ ...data });
    },
    setChecking(data) {
      set({ ...data });
    },
    novelChecking() {
      let isErr = false;
      (Object.keys(novelChecking) as Array<keyof NovelChecking>).forEach(item => {
        const check = get()[item];
        const nowData = get()[check.key];

        if (check.essential && nowData === novel[check.key]) {
          set({
            ...get(),
            [item]: { ...get()[item], isError: true },
          });
          isErr = true;
        } else if (check.essential && nowData !== novel[check.key]) {
          set({
            ...get(),
            [item]: { ...get()[item], isError: false },
          });
        }
      });
      return isErr;
    },
    postChecking() {
      let isErr = false;
      (Object.keys(postChecking) as Array<keyof PostChecking>).forEach(item => {
        const check = get()[item];
        const nowData = get()[check.key];

        if (check.essential && nowData === post[check.key]) {
          set({
            ...get(),
            [item]: { ...get()[item], isError: true },
          });
          isErr = true;
        } else if (check.essential && nowData !== post[check.key]) {
          set({
            ...get(),
            [item]: { ...get()[item], isError: false },
          });
        }
      });
      return isErr;
    },
    // makeBody() {
    //   (
    //     Object.keys({ ...novelChecking, ...postChecking }) as Array<
    //       keyof (NovelChecking & PostChecking)
    //     >
    //   ).forEach(item => {
    //     const check = get()[item];

    //     if(check.essential)
    //   });
    // },
  })
);
