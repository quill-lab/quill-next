'use server';

import { prisma } from '@/lib/prisma';

export const getAdminAccountId = async (roomId: any) => {
  const contributorGroups = await prisma.contributor_groups.findFirst({
    where: {
      id: roomId,
    },
    select: {
      contributors: {
        select: {
          account_id: true,
          role: true,
        },
      },
    },
  });

  const admin = contributorGroups?.contributors.find(contributor => contributor.role === 'MAIN');
  console.log({ admin });
  return { adminAccountId: admin?.account_id };
};
