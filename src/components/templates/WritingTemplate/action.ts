'use server';

interface RequestPublication {
  chapterId: string;
  title: string;
  episodeTitle: string;
  episode: number;
}

export const notififyDiscordRequestPublication = async ({
  chapterId,
  title,
  episodeTitle,
  episode,
}: RequestPublication) => {
  await fetch(process.env.DISCORD_WEBHOOK || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: '작가의 정원 AI 봇',
      avatar_url: 'https://quill-next-two.vercel.app/images/login-logo.svg',
      content: '새로운 연재신청이 들어왔습니다.',
      embeds: [
        {
          title,
          description: `${episodeTitle}`,
          color: 5814783, // 예쁜 연한 보라색
          fields: [
            {
              name: '연재 회차',
              value: `${episode}회차`,
              inline: true,
            },
            {
              name: '링크',
              value: `https://quill-next-two.vercel.app/admin/chapters/${chapterId}`,
              inline: true,
            },
          ],
        },
      ],
    }),
  });
};
