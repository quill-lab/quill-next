import { Chapter } from '@/shared/interface/chapter';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

interface EpisodeListProps {
  episodes: Chapter[];
}

const EpisodeList = ({ episodes }: EpisodeListProps) => {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId;

  const matchStatus = {
    IN_PROGRESS: '작성중',
    REQUESTED: '연재 검토중',
    APPROVED: '연재완료',
    REJECTED: '연재거절',
    CANCELLED: '연재취소',
    DRAFT: '작성중',
  };

  return (
    <table className="w-full">
      <thead className="w-full text-center">
        <tr className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa">
          <th className="px-[24px] py-[16px]">회차</th>
          <th>제목</th>
          <th>최종작성일</th>
          <th>상태</th>
          <th>연재승인일</th>
          <th>조회수</th>
          <th>댓글</th>
          <th>좋아요</th>
          <th>현 작성자</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colSpan={8}></td>
        </tr>
      </tbody>

      <tbody className="w-full text-center text-[#2D2D2D] text-[14px] font-[500]">
        {episodes.map(episode => (
          <tr
            className={`w-full ${
              episode.status === 'IN_PROGRESS' && 'bg-[white] bg-opacity-[0.5]  rounded-[10px]'
            }`}
          >
            <td className="px-[24px] py-[16px]">{episode.episode}</td>
            <td>{episode.title}</td>
            <td>{dayjs(episode.editedAt).format('YYYY.M.D')}</td>
            <td>{matchStatus[episode.status]}</td>
            <td>{dayjs(episode.approvedAt).format('YYYY.M.D')}</td>
            <td>{episode.metadata.viewCount}</td>
            <td>{episode.metadata.commentCount}</td>
            <td>{episode.metadata.likeCount}</td>
            <td>{episode.currentAuthor?.name}</td>
            <td>
              <button
                onClick={() =>
                  router.push(`/work-space/detail/${roomId}/writing?episode=${episode.id}`)
                }
                className="flex justify-center items-center gap-[4px] py-[4px] px-[12px] bg-[#fff] rounded-[6px] border border-[0.6px] border-[#D9D9D9]"
              >
                <p className="text-[#787774] text-center font-spoqa text-[12px] font-[500]">입장</p>
                <Image src={'/images/right-arrow.svg'} width={10} height={7.5} alt="right-arrow" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpisodeList;
