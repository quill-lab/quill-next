import { Chapter } from '@/shared/interface/chapter';
import dayjs from 'dayjs';
import Image from 'next/image';

interface EpisodeListProps {
  episodes: Chapter[];
}

const EpisodeList = ({ episodes }: EpisodeListProps) => {
  return (
    <table className="w-full">
      <thead className="w-full text-center">
        <tr className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa">
          <th className="py-[16px]">회차</th>
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

      <tbody className="text-center text-[#2D2D2D] text-[14px] font-[500]">
        {episodes.map(episode => (
          <tr>
            <td className="py-[16px]">{episode.episode}</td>
            <td>{episode.title}</td>
            <td>{dayjs(episode.editedAt).format('YYYY.M.D')}</td>
            <td>{episode.status}</td>
            <td>{dayjs(episode.approvedAt).format('YYYY.M.D')}</td>
            <td>{episode.metadata.viewCount}</td>
            <td>{episode.metadata.commentCount}</td>
            <td>{episode.metadata.likeCount}</td>
            <td>{episode.currentAuthor?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpisodeList;
