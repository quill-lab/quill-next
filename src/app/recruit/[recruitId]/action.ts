import { prisma } from '@/lib/prisma';

export const getRecruitDetail = async (recruitId: string) => {
  const recruitDetailData = await prisma.contributor_group_recruitments.findFirst({
    where: { id: recruitId },
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
  });

  if (recruitDetailData) {
    const formattedData = {
      ...recruitDetailData,
      like: recruitDetailData.like ?? 0,
      view: recruitDetailData.view ?? 0,
      author: {
        name: recruitDetailData.author?.name ?? 'Unknown', // 기본값 설정
      },
      author_id: recruitDetailData.author_id ?? 'Unknown',
      contributor_group: {
        max_contributor_count: recruitDetailData?.contributor_group?.max_contributor_count ?? 5,
        contributor_count: recruitDetailData?.contributor_group?.contributor_count ?? 1,
        novels: {
          title: recruitDetailData?.contributor_group?.novels?.title ?? 'Unknown',
        },
      },
    };

    await prisma.contributor_group_recruitments.update({
      where: { id: recruitDetailData.id },
      data: { view: recruitDetailData.view ? recruitDetailData.view + 1 : 1 },
    });

    return formattedData;
  }

  return null;
};

export const isLikeRecruit = async (userId = '', recruitId: string) => {
  const findLikeRecruit = await prisma.recruitment_user_like.findFirst({
    where: {
      user_id: userId,
      recruitment_id: recruitId,
    },
  });

  return findLikeRecruit ? true : false;
};
