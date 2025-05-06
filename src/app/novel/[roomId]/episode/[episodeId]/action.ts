import { prisma } from '@/lib/prisma';

export const getEpisodeData = async (roomId: string, episodeId: string) => {
  const episodeData = await prisma.contributor_groups.findFirst({
    where: {
      id: roomId,
    },
    select: {
      novels: {
        select: {
          title: true,
          chapters: {
            where: {
              id: episodeId,
            },
            select: {
              title: true,
              chapter_number: true,
            },
          },
        },
      },
    },
  });

  const formattedEpisode = {
    title: episodeData?.novels.title || '',
    episodeTitle: episodeData?.novels?.chapters[0]?.title || '',
    chapterNumber: episodeData?.novels?.chapters[0]?.chapter_number || 0,
  };

  return formattedEpisode;
};
