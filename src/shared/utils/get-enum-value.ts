import { NovelRoomStatus } from '../interface';

const getNovelRoomStatus = (status: NovelRoomStatus) => {
  switch (status) {
    case 'prepare':
      return '연재준비중';
    case 'series':
      return '연재중';
    case 'complete':
      return '연재완료';
    default:
      return '알지못하는상태';
  }
};

export { getNovelRoomStatus };
