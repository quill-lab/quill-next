'use client';

import { IParticipatingAuthor } from '@/shared/interface/author';
import callApi from '@/shared/utils/fetchWrapper';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface ParticipatingAuthorsProps {
  participatingAuthors: IParticipatingAuthor[];
}

const ParticipatingAuthors = ({ participatingAuthors }: ParticipatingAuthorsProps) => {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params?.roomId;

  const handleExpel = async (id: string) => {
    await callApi({
      url: `/api/v1/novel-rooms/${roomId}/contributors/${id}`,
      method: 'DELETE',
      token: session?.user?.token,
    });

    toast.success('강퇴가 성공적으로 이루어졌습니다.');
  };

  return (
    <div className="rounded-[10px] w-full overflow-hidden">
      <div className="py-[16px] bg-[#fff] bg-opacity-[0.7] w-full">
        <h3 className="text-[#2D2D2D] text-center text-[14px] font-[500]">참여 작가</h3>
      </div>

      <div className="bg-[#C1E7EB] pb-[8px] w-full flex justify-center items-center">
        <table className="w-full table-fixed">
          <thead className="w-full">
            <tr>
              <th className="py-[16px] text-[#2d2d2d] text-[14px] font-[500] font-spoqa w-[1/3]">
                닉네임
              </th>
              <th className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa w-[1/3]">참여일</th>
              <th className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa w-[1/3]">퇴장</th>
            </tr>
          </thead>
          <tbody className="w-full text-center max-w-[800px]">
            {participatingAuthors.map(author => (
              <tr>
                <td className="py-[8px] px-[16px]">
                  <div className="flex items-center justify-center gap-[12px]">
                    <Image src={'/images/avatar.png'} width={24} height={24} alt="profile image" />
                    <p className="text-[#2d2d2d] text-[14px] font-[400]">{author.nickname}</p>
                    {author.role === 'MAIN' && (
                      <Image src={'/images/crown.svg'} width={16} height={16} alt="crown image" />
                    )}
                  </div>
                </td>
                <td className="py-[8px] text-[#2d2d2d] text-[14px] font-[400]">
                  {dayjs(author.joinedAt).format('YYYY.M.D')}
                </td>
                <td className="py-[8px]">
                  <div className="flex justify-center items-center">
                    {author.role !== 'MAIN' && (
                      <button
                        onClick={() => {
                          handleExpel(author.id);
                        }}
                        className="group bg-[#fff] px-[16px] py-[8px] rounded-[10px] flex items-center gap-[10px]"
                      >
                        <p className="text-[14px] text-[#2d2d2d] group-hover:text-[#059EAF]">
                          강제 퇴장
                        </p>
                        <div className="relative w-[16px] h-[16px]">
                          <Image
                            src={'/images/exit.svg'}
                            alt="강제 퇴장"
                            fill
                            className="block group-hover:hidden"
                          />
                          <Image
                            src={'/images/exit-hover.svg'}
                            alt="강제 퇴장 hover"
                            fill
                            className="hidden group-hover:block"
                          />
                        </div>
                      </button>
                    )}
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

export default ParticipatingAuthors;
