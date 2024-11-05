import { useRouter } from 'next/router';
import React from 'react';
import { dateChanger } from '@/shared/utils/dateChange';
import { toast } from 'react-toastify';

import { NovelPost } from '@/shared';

import styles from './NovelTable.module.scss';
import { NovelTableProps } from './type';
import Link from 'next/link';

const writerType = {
  host: '대표작가',
  attendee: '참여작가',
};
export const roomStatus = {
  prepare: '연재준비중',
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

const ActiveTabTableBody = ({ item }: { item: NovelPost }) => {
  const route = useRouter();

  const onClickTableItem = (id: number) => {
    route.push(`/work-space/detail?room=${id}`);
  };

  return (
    <tr key={item.id} onClick={() => onClickTableItem(item.id)}>
      <td style={{ width: '11.75rem' }}>{item.category.name}</td>
      <td style={{ width: '15rem' }}>{item.title}</td>
      <td style={{ width: '9rem' }}>{dateChanger(item.createdAt)}</td>
      <td style={{ width: '9.25rem' }}>{dateChanger(item.completedAt)}</td>
      <td style={{ width: '9rem' }}>{writerType[item.writerCategory]}</td>
      <td style={{ width: '6rem' }}>
        {item.currentAttendCnt}/{item.type}
      </td>
      <td style={{ width: '9rem' }}>{item.currentWriter}</td>
      <td style={{ width: '6rem' }}>{roomStatus[item.status]}</td>
    </tr>
  );
};

function PendingTabTableBody({ item }: { item: NovelPost }) {
  const route = useRouter();

  const onClickTableItem = (id: number) => {
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
    <tr key={item.id} onClick={() => onClickTableItem(item.id)}>
      {/* <td style={{ width: '11.75rem' }}>{item.category.name}</td> */}
      <td style={{ width: '15rem' }}>{item.title}</td>
      <td style={{ width: '9rem' }}>{dateChanger(item.createdAt)}</td>
      <td style={{ width: '9.25rem' }}>{dateChanger(item.completedAt)}</td>
      <td style={{ width: '11.75rem' }}>{dateChanger(item.exitedAt)}</td>
      <td style={{ width: '9rem' }}>승인대기</td>
      {/* <td style={{ width: '6rem' }}>{item.currentAttendCnt}/5</td>
      <td style={{ width: '9rem' }}>{item.currentWriter}</td>
      <td style={{ width: '6rem' }}>{item.status}</td> */}
    </tr>
  );
}
export const NovelTable = ({ tableData, tab }: NovelTableProps) => {
  const tabHeaders = tab === 'attending' ? activeTabHeaderNames : pendingTabHeaderNames;

  const renderTableBody = () => {
    if (tab === 'attending') {
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
    <table className={styles.table}>
      <thead>
        <tr>
          {tabHeaders.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </table>
  );
};
