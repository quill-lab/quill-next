import { DetailedWorkSpaceTab, TabId } from '@/components';
import { NovelTitle } from '@/components/work-space/detail/NovelTitle/NovelTitle';
import { WorkInfo } from '@/components/work-space/detail/WorkInfo/WorkInfo';

const tabs = [
  {
    label: '작품 정보',
    id: 'work-info' as TabId,
    content: <WorkInfo />,
  },
  {
    label: '작품 기획',
    id: 'work-plan' as TabId,
    content: <div>여기에 작품 기획 내용이 표시됩니다.</div>,
  },
  {
    label: '글쓰기',
    id: 'writing' as TabId,
    content: <div>여기에 글쓰기 기능이 표시됩니다.</div>,
  },
  {
    label: '작품 회차',
    id: 'work-episodes' as TabId,
    content: <div>여기에 작품 회차가 표시됩니다.</div>,
  },
  {
    label: '작가 관리',
    id: 'author-management' as TabId,
    content: <div>여기에 작가 관리 정보가 표시됩니다.</div>,
  },
];

const DetailWorkSpacePage = async () => {
  return (
    <>
      <NovelTitle
        title={'테스트'}
        status={'prepare'}
        category={{ id: 12, name: 'ss' }}
        editMode={true}
      />
      <DetailedWorkSpaceTab tabs={tabs} />
    </>
  );
};

export default DetailWorkSpacePage;
