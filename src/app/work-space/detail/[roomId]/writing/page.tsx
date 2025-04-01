import WritingTemplate from '@/components/templates/WritingTemplate';
import { redirect } from 'next/navigation';

interface WritingPageProps {
  searchParams: {
    chapterId: string;
  };
}

const WritingPage = ({ searchParams }: WritingPageProps) => {
  const chapterId = searchParams.chapterId;

  // TODO: chapterId 가 없을 경우 list로 리다이렉트
  if (!chapterId) {
    // redirect('/work-space');
  }

  return <WritingTemplate />;
};

export default WritingPage;
