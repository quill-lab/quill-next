'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import DropDownBox from '@/components/molecules/Dropbox';
import MobileTabHeader from '@/components/molecules/MobileTabHeader';
import EpisodeList from '@/components/organisms/EpisodeList';
import WorkSpaceTabHeader from '@/components/organisms/WorkSpaceTabHeader';
import { Chapter } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface EpisodeTemplateInterface {
  episodes: Chapter[];
}

export default function EpisodeTemplate({ episodes }: EpisodeTemplateInterface) {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId;
  const [title, setTitle] = useState('');
  const [isCreateChapterPending, startCreateChapterTransition] = useTransition();

  const handleCreateChapter = () => {
    startCreateChapterTransition(async () => {
      const createdChapter = await callApi<{ id: string }>({
        url: `/api/v1/novel-rooms/${roomId}/chapters`,
        method: 'POST',
        token: session?.user?.token,
      });
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/chapters/${createdChapter.id}`,
        body: { title: title },
        method: 'PATCH',
        token: session?.user?.token,
      }).then(() => {
        setTitle('');
        router.refresh();
      });
    });
  };

  return (
    <div>
      <div className="sm:hidden">
        <MobileTabHeader currentTab="episode" />
      </div>
      <div className="hidden sm:block">
        <WorkSpaceTabHeader currentTab="/episode" />
      </div>
      {isCreateChapterPending && <LoadingBar />}
      <div className="mt-[8px] w-full bg-[white] bg-opacity-50 rounded-b-[10px]">
        <div className="pt-[24px] px-[24px]">
          <Dialog>
            <DialogTrigger
              onClick={() => {}}
              className="w-full py-[14px] flex flex-col items-center justify-center border-[0.6px] border-[#059EAF] bg-[#E7F6F8] rounded-[10px] text-[#059eaf] text-[14px] font-[500]"
            >
              <Image
                src={'/images/createChapter.svg'}
                width={60}
                height={60}
                alt="회차 생성 버튼"
              />
              회차 생성하기
            </DialogTrigger>

            <DialogOverlay className="bg-[#252525CC] fixed inset-0 flex justify-center items-center">
              <DialogContent
                className="p-0 sm:max-w-md bg-[#fff] fixed flex flex-col items-center border-none"
                style={{ borderRadius: '10px' }}
              >
                <div className="text-center px-[60px] py-[66px]">
                  <h3 className="text-[#2D2D2D] text-[20px] font-[500] font-spoqa">제목 입력</h3>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="min-w-[384px] mt-[16px] w-full py-[8px] px-[16px] bg-[#e7f6f8] outline-none placeholder:text-center placeholder:text-[#A6A6A6] text-[16px] text-[400]"
                    placeholder="해당 회차의 제목을 작성해 주세요."
                  />
                </div>
                <div className="flex w-full">
                  <DialogClose
                    className="w-full py-[16px] bg-[#059EAF] text-[#fff] rounded-bl-[10px]"
                    onClick={handleCreateChapter}
                  >
                    확인
                  </DialogClose>
                  <DialogClose
                    onClick={() => setTitle('')}
                    className="w-full py-[16px] bg-[#FFF] text-[#959595] border border-[0.5px] border-[#D9D9D9] rounded-br-[10px]"
                  >
                    취소
                  </DialogClose>
                </div>
              </DialogContent>
            </DialogOverlay>
          </Dialog>
        </div>
        <div className="px-[24px] pt-[24px] pb-[16px] flex justify-between items-center">
          <DropDownBox />

          <button className="bg-[white] bg-opacity-50 rounded-[100px] px-[16px] py-[8px] text-[#059eaf] text-[12px] font-[500] font-[spoqa] flex gap-[4px]">
            작품 보러 가기
          </button>
        </div>
        <div className="w-full px-[76px]">
          <EpisodeList episodes={episodes} />
        </div>
      </div>
    </div>
  );
}
