import { authOptions } from '@/authOptions';
import RecruitTemplate from '@/components/templates/RecruitTemplate';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { getRecruitList } from './action';

interface IRecruitCard {
  id: string;
  created_at: string;
  title: string;
  content: string;
  link: string;
  like: number;
  view: number;
  author: { name: string };
  contributor_group: {
    max_contributor_count: number;
    contributor_count: number;
    novels: { title: string };
  };
}

const RecruitPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  const recruitList: IRecruitCard[] | [] = await getRecruitList();

  // const recruitResponse: &callApiResponse = callApi({
  //     url:`/api/v1/users/me/contributor-requests`,
  //     method:'GET',
  //     token:session?.user?.token
  // })

  // if()

  return <RecruitTemplate recruitList={recruitList} />;
};

export default RecruitPage;
