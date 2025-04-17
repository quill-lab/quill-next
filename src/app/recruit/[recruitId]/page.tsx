import RecruitDetailTemplate from '@/components/templates/RecruitDetailTemplate';
import React from 'react';
import { getRecruitDetail, isLikeRecruit } from './action';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

interface RecruitData {
  id: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  persisted_at: Date | null;
  title: string | null;
  content: string | null;
  link: string | null;
  like: number;
  view: number;
  contributor_group_id: string | null;
  author_id: string;
  author: { name: string };
  contributor_group: {
    max_contributor_count: number;
    contributor_count: number;
    novels: { title: string };
  };
}

const RecruitDetailPage = async ({ params }: { params: { recruitId: string } }) => {
  const session = await getServerSession(authOptions);
  const recruitId = params.recruitId;

  if (!recruitId) {
    redirect('/recruit');
  }

  const recruitData: RecruitData | null = await getRecruitDetail(recruitId);
  if (!recruitData) {
    redirect('/recruit');
  }

  const isLike: boolean = await isLikeRecruit(session?.user?.id, recruitId);

  const mappedRecruitData = {
    ...recruitData,
    isLike,
  };
  return <RecruitDetailTemplate recruitData={mappedRecruitData} />;
};

export default RecruitDetailPage;
