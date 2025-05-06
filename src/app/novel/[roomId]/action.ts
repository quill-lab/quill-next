import { prisma } from '@/lib/prisma';

export const getNovelAuthorList = async (roomId: string) => {
  const contributors = await prisma.contributor_groups.findFirst({
    where: {
      id: roomId,
    },
    select: {
      contributors: {
        select: {
          role: true,
          account: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const formattedContributors = contributors?.contributors.map(contributor => {
    return {
      role: contributor.role ?? '',
      name: contributor.account.name ?? '',
    };
  });

  return formattedContributors;
};
