import { authOptions } from '@/authOptions';
import RecruitTemplate from '@/components/templates/RecruitTemplate';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import React from 'react';

interface RecruitPage {}

const RecruitPage = async () => {
  const session = await getServerSession(authOptions);

  // const recruitResponse: &callApiResponse = callApi({
  //     url:`/api/v1/users/me/contributor-requests`,
  //     method:'GET',
  //     token:session?.user?.token
  // })

  // if()

  return <RecruitTemplate />;
};

export default RecruitPage;
