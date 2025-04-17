// ./action.ts
'use server';

import { prisma } from '@/lib/prisma';

type RawRecruit = {
  id: string;
  created_at: Date | null;
  title: string | null;
  content: string | null;
  link: string | null;
  like: number | null;
  view: number | null;
  author: { name: string };
  contributor_group: {
    max_contributor_count: number;
    contributor_count: number;
    novels: { title: string };
  };
};

export const getRecruitList = async () => {
  const recruitmentList = (await prisma.contributor_group_recruitments.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      contributor_group: {
        select: {
          max_contributor_count: true,
          contributor_count: true,
          novels: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  })) as RawRecruit[] | [];

  // recruitmentList를 IRecruitCard[] 형태로 변환
  const formattedList = recruitmentList.map(item => ({
    id: item.id,
    created_at: item.created_at?.toISOString() ?? '',
    title: item.title ?? '',
    content: item.content ?? '',
    link: item.link ?? '',
    like: item.like ?? 0,
    view: item.view ?? 0,
    author: item.author ?? { name: '' },
    contributor_group: item.contributor_group ?? {
      max_contributor_count: 0,
      contributor_count: 0,
      novels: { title: '' },
    },
  }));

  return formattedList;
};
