import { prisma } from '@/lib/prisma';

export const editDescription = async (chapterId: string, description: string) => {
  return await prisma.chapters.update({
    where: {
      id: chapterId,
    },
    data: {
      description,
    },
  });
};
