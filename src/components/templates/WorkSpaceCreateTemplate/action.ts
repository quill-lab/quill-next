'use server';

import { prisma } from '@/lib/prisma';

interface CreateRecruitment {
  title: string;
  content: string;
  link: string;
  contributorGroupId: string;
  authorId: string;
}

export const createRecruimentAction = async ({
  title,
  content,
  link,
  contributorGroupId,
  authorId,
}: CreateRecruitment) => {
  const result = await prisma.contributor_group_recruitments.create({
    data: {
      title,
      content,
      link,
      contributor_group_id: contributorGroupId,
      author_id: authorId,
    },
  });

  console.log(result.id);
  return result.id;
};
