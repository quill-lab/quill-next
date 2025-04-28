import { useRouter } from 'next/navigation';
import React from 'react';
import { dateChanger } from '@/shared/utils/dateChange';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { NovelItem, NovelPost } from '@/shared';
import { NovelTableProps } from './type';
import Link from 'next/link';

const writerType: { [key: string]: string } = {
  MAIN: '대표작가',
  attendance: '참여작가',
};

export const roomStatus: { [key: string]: string } = {
  PREPARING: '연재준비중',
  series: '연재중',
  complete: '연재완료',
  remove: '삭제',
};

const activeTabHeaderNames = [
  '카테고리',
  '제목',
  '개설일',
  '완결일',
  '작가 구분',
  '정원',
  '현 작성자',
  '현황',
];
const pendingTabHeaderNames = ['제목', '참여 신청일', '참여일', '퇴장일', '작가 참여상태'];

const ActiveTabTableBody = ({ item }: { item: NovelItem }) => {
  const route = useRouter();

  const onClickTableItem = (id: string) => {
    route.push(`/work-space/detail/${id}/info`);
  };

  return (
    <tr
      key={item.id}
      className="h-12 text-[#2D2D2D] text-[14px] font-medium border-b border-gray-100 transition-all duration-200 ease-in-out cursor-pointer hover:text-blue-500"
      onClick={() => onClickTableItem(item.id)}
    >
      <td style={{ width: '11.75rem' }}>{item.category.alias}</td>
      <td style={{ width: '15rem' }}>{item.title}</td>
      <td style={{ width: '9rem' }}>{dayjs(item.createdAt).format('YYYY.M.D')}</td>
      <td style={{ width: '9.25rem' }}>{dateChanger(item.completedAt)}</td>
      <td style={{ width: '9rem' }}>{writerType[item.role]}</td>
      <td style={{ width: '6rem' }}>
        {item.contributorCount}/{item.maxContributorCount}
      </td>
      <td style={{ width: '9rem' }}>{item?.author?.name}</td>
      <td style={{ width: '6rem' }}>{roomStatus[item.status]}</td>
    </tr>
  );
};

function PendingTabTableBody({ item }: { item: NovelItem }) {
  const route = useRouter();

  const onClickTableItem = (id: string) => {
    if (!item.completedAt) {
      toast(() => (
        <div className={'flex flex-col gap-4 py-5 '}>
          <span className={'font-bold text-gray6'}>해당 공방은 현재 검토중입니다.</span>
          <span className={'text-xs text-gray6'}>
            대표작가의 검토가 끝난 후 결과를 알려드립니다.
          </span>
        </div>
      ));
      return;
    }

    route.push(`/work-space/detail?room=${id}`);
  };

  return (
    <tr
      key={item.id}
      className="h-12 text-[#2D2D2D] text-[14px] font-medium border-b border-gray-100 transition-all duration-200 ease-in-out cursor-pointer hover:text-blue-500"
      onClick={() => onClickTableItem(item.id)}
    >
      <td style={{ width: '15rem' }}>{item.title}</td>
      <td style={{ width: '9rem' }}>{dateChanger(item.createdAt)}</td>
      <td style={{ width: '9.25rem' }}>{dateChanger(item.completedAt)}</td>
      <td style={{ width: '11.75rem' }}>{dateChanger(item.exitedAt)}</td>
      <td style={{ width: '9rem' }}>승인대기</td>
    </tr>
  );
}
export const NovelTable = ({ tableData, tab }: NovelTableProps) => {
  const tabHeaders = tab === 'attending' ? activeTabHeaderNames : pendingTabHeaderNames;

  const renderTableBody = () => {
    if (tab === 'attending') {
      if (tableData.length === 0) {
        return (
          <div className={'flex w-full justify-center text-gray1 font-medium text-sm pt-4'}>
            참여 신청 중인 소설공방이 없습니다.
            <Link href={'/recruit'} className={'text-blue2 ml-1'}>
              작가모집
            </Link>
            에서 원하는 소설공방을 찾아보세요.
          </div>
        );
      }

      return tableData.map(item => <ActiveTabTableBody key={item.id} item={item} />);
    }

    if (tableData.length === 0) {
      return (
        <div className={'flex w-full justify-center text-gray1 font-medium text-sm pt-4'}>
          참여 신청 중인 소설공방이 없습니다.
          <Link href={'/recruit'} className={'text-blue2 ml-1'}>
            작가모집
          </Link>
          에서 원하는 소설공방을 찾아보세요.
        </div>
      );
    }
    return tableData.map(item => <PendingTabTableBody key={item.id} item={item} />);
  };

  return (
    <table className="min-w-full text-center text-[14px] border-collapse">
      <thead className="border-b border-gray-300">
        <tr>
          {tabHeaders.map(name => (
            <th key={name} className="h-12 font-medium">
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </table>
  );
};
