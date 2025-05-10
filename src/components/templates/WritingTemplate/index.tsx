'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import ChapterItemList from '@/components/organisms/ChapterItemList';
import { Member } from '@/shared';
import { ChapterText, DraftText } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { useWriting } from '@/stores/useWriting';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { notififyDiscordRequestPublication } from './action';
import './custom-scrollbar.scss';

interface WritingTemplateProps {
  chapter: { title: string; chapterTitle: string; chapterNumber: number; chapters: ChapterText[] };
  draftText: DraftText;
  adminAccount: Member;
  currentAuthor: { id: string; name: string; accountId: string };
}

const WritingTemplate = ({
  chapter,
  draftText,
  adminAccount,
  currentAuthor,
}: WritingTemplateProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [isPendingSaveContent, startSaveContent] = useTransition();
  const [isPendingFinalizeContent, startFinalizeContent] = useTransition();
  const [isPendingPublish, startPublish] = useTransition();
  const roomId = params?.roomId;
  const chapterId = searchParams?.get('episode');
  const { isSaving, draftContent } = useWriting();

  const handleFinalizeText = async () => {
    startFinalizeContent(async () => {
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/draft-text`,
        method: 'PATCH',
        token: session?.user.token,
        body: { content: draftContent },
      });

      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/finalize`,
        method: 'POST',
        token: session?.user?.token,
      }).then(() => router.push(`/work-space/detail/${roomId}/episode`));
    });
  };

  const handleSaveDraftContent = async () => {
    startSaveContent(async () => {
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/draft-text`,
        method: 'PATCH',
        token: session?.user.token,
        body: { content: draftContent },
      });
    });
  };

  const handleRequestPublication = async () => {
    startPublish(async () => {
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/finalize`,
        method: 'POST',
        token: session?.user?.token,
      });

      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/publication-requests`,
        method: 'POST',
        token: session?.user?.token,
      });

      await notififyDiscordRequestPublication({
        chapterId: chapterId || '',
        title: '국밥집 막내아들',
        episodeTitle: '국밥집 열었음',
        episode: 5,
      }).then(() => router.push(`/work-space/detail/${roomId}/episode`));
    });
  };

  return (
    <div className="flex flex-col items-center">
      {(isPendingFinalizeContent || isPendingPublish) && <LoadingBar />}
      <div className="w-full bg-[#E7F6F880] rounded-tl-[10px] rounded-tr-[10px]">
        <div className="w-full">
          <div className="w-full rounded-tl-[10px] rounded-tr-[10px] bg-[white] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-between items-center py-[18px] px-[32px]">
            <div className="flex items-center gap-[]">
              <h2 className="text-[#2D2D2D] font-spoqa text-[16px] font-[500]">
                {chapter.chapterNumber}화 {chapter.chapterTitle}
              </h2>
            </div>
            {currentAuthor.accountId === session?.user?.id &&
              (isSaving || isPendingSaveContent ? (
                <Image src="/images/isSaving.svg" width={40} height={40} alt="is saving" />
              ) : (
                <button className="relative group">
                  <Image
                    className="cursor-pointer"
                    onClick={handleSaveDraftContent}
                    src="/images/save.svg"
                    width={40}
                    height={40}
                    alt="save"
                  />
                  <div className="hidden group-hover:flex absolute left-1/2 transform -translate-x-1/2 flex-col items-center">
                    <Image src="/images/triangle.svg" width={12} height={10} alt="point" />
                    <div className="mt-[-1px] bottom-[-1px] left-[5px] px-[12px] py-[8px] rounded-[10px] bg-[#41B4C0]">
                      <p className="text-[#fff] text-[14px] font-spoqa font-[400]">
                        {dayjs(new Date()).format('HH:mm:ss')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div className="w-full h-[16px] rounded-bl-[10px] rounded-br-[10px] bg-[#077D8A] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)]" />
        </div>
        <div className="px-[24px] pb-[28px]">
          <ChapterItemList
            chapter={chapter.chapters}
            draftText={draftText}
            currentAuthor={currentAuthor}
          />
        </div>
      </div>
      <div className="w-full mt-[18px] flex gap-[36px] items-center justify-center">
        {currentAuthor.id === session?.user?.id && (
          <button
            onClick={handleFinalizeText}
            className="rounded-[62px] bg-[#059EAF] py-[16px] px-[68px] text-[#e7f6f8] text-center text-[14px] font-[500] text-spoqa"
          >
            차례 끝내기
          </button>
        )}
        {adminAccount.nickname === session?.user?.name && (
          <button
            onClick={handleRequestPublication}
            className="bg-[#E7F6F8] py-[16px] px-[68px] text-[#059EAF] text-center text-[14px] font-[500] text-spoqa rounded-[62px]"
          >
            검토 후 연재
          </button>
        )}
      </div>
    </div>
  );
};

export default WritingTemplate;
