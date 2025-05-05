'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import { IApplicantAuthor } from '@/shared/interface/author';
import callApi from '@/shared/utils/fetchWrapper';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface ApplicantAuthorProps {
  applicantAuthor: IApplicantAuthor[];
  recruitment: { id: string };
}

const ApplicantAuthor = ({ applicantAuthor, recruitment }: ApplicantAuthorProps) => {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId;
  const [isApplyPending, startApplyTransition] = useTransition();
  const [isDeclinePending, startDeclineTransition] = useTransition();
  const { data: session } = useSession();

  const handleApply = async (requesterId: string) => {
    startApplyTransition(async () => {
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/join-requests/${requesterId}/approve`,
        method: 'POST',
        token: session?.user?.token,
      }).then(() => {
        router.refresh();
      });
    });
  };

  const handleDecline = async (requesterId: string) => {
    startDeclineTransition(async () => {
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}/join-requests/${requesterId}/reject`,
        method: 'POST',
        token: session?.user?.token,
      }).then(() => {
        router.refresh();
      });
    });
  };

  return (
    <div className="rounded-[10px] w-full overflow-hidden">
      {(isApplyPending || isDeclinePending) && <LoadingBar />}
      <div className="flex justify-between px-[24px] items-center py-[8px] bg-[#fff] bg-opacity-[0.7] w-full">
        <div className="w-full" />
        <h3 className="w-full text-[#2D2D2D] text-center text-[14px] font-[500]">신청 작가</h3>
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => router.push(`/recruit/${recruitment.id}`)}
            className="rounded-[100px] bg-[#fff] py-[8px] px-[32px] text-[#059EAF] text-[12px] font-[500] text-center"
          >
            모집 게시글 이동
          </button>
        </div>
      </div>

      <div className="bg-[#C1E7EB] pb-[8px] w-full flex justify-center items-center">
        <table className="w-full table-fixed">
          <thead className="w-full">
            <tr>
              <th className="py-[16px] text-[#2d2d2d] text-[14px] font-[500] font-spoqa w-[1/3]">
                닉네임
              </th>
              <th className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa w-[1/3]">신청일</th>
              <th className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa w-[1/3]">
                참여 여부
              </th>
            </tr>
          </thead>
          <tbody className="w-full text-center max-w-[800px]">
            {applicantAuthor &&
              applicantAuthor.map(author => (
                <tr>
                  <td className="py-[8px] px-[16px]">
                    <div className="flex items-center justify-center gap-[12px]">
                      <p className="text-[#2d2d2d] text-[14px] font-[400]">{author.name}</p>
                    </div>
                  </td>
                  <td className="py-[8px] text-[#2d2d2d] text-[14px] font-[400]">
                    {dayjs(author.created_at).format('YYYY.M.D')}
                  </td>
                  <td className="py-[8px]">
                    <div className="w-full flex justify-center items-center gap-[8px]">
                      <button
                        onClick={() => handleApply(author.id)}
                        className="rounded-[10px] py-[8px] px-[48px] bg-[#059EAF] text-[#fff] text-center text-[14px] font-[400]"
                      >
                        승인
                      </button>
                      <button
                        onClick={() => handleDecline(author.id)}
                        className="rounded-[10px] py-[8px] px-[48px] bg-[#fff] text-[#959595] text-center text-[14px] font-[400]"
                      >
                        반려
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantAuthor;
