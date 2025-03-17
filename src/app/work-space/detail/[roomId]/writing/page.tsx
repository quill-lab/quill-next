import WritingTemplate from '@/components/templates/WritingTemplate';

interface WritingPageProps {
  searchParams: {
    chapterId: string;
  };
}

const WritingPage = ({ searchParams }: WritingPageProps) => {
  const chapterId = searchParams.chapterId;

  if (!chapterId) {
  }

  return <WritingTemplate />;
};

export default WritingPage;
