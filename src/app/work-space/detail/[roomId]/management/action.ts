'use server';

import { prisma } from '@/lib/prisma';

export const getApplicantAuthor = async (roomId: string) => {
  const applicantAuthorList = await prisma.contributor_requests.findMany({
    where: {
      contributor_group_id: roomId,
      status: 'REQUESTED',
    },

    select: {
      id: true,
      created_at: true,
      contributor_groups: {
        select: {
          contributors: {
            select: {
              role: true,
            },
          },
        },
      },
      account: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const formattedApplicantAuthor = applicantAuthorList.map(author => ({
    id: author?.id ?? 'unknown',
    user_id: author?.account?.id ?? 'unknown',
    name: author?.account?.name ?? 'unknown',
    created_at: author.created_at ?? new Date(),
  }));
  return formattedApplicantAuthor;
};

export const getRecruitmentId = async (roomId: string) => {
  const recruitments = await prisma.contributor_groups.findFirst({
    where: {
      id: roomId,
    },
    select: {
      recruitments: {
        select: {
          id: true,
        },
      },
    },
  });

  const formattedRecruitments = recruitments!.recruitments.map(recruitment => {
    return {
      id: recruitment.id ?? '',
    };
  });

  return formattedRecruitments;
};
