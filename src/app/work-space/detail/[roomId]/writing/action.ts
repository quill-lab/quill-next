import { prisma } from '@/lib/prisma';

export const getChapter = async (chapterId: string) => {
  return await prisma.chapters.findFirst({
    where: {
      id: chapterId,
    },
    select: {
      title: true,
      status: true,
      chapter_number: true,
      novels: {
        select: {
          title: true,
        },
      },
    },
  });
};
