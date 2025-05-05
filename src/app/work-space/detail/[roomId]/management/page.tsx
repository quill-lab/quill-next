import ManagementTemplate from '@/components/templates/ManagementTemplate';
import { redirect } from 'next/navigation';
import React from 'react';
import { getApplicantAuthor, getRecruitmentId } from './action';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import { IParticipatingAuthor } from '@/shared/interface/author';
import { callApiResponse } from '@/shared/interface/api';

const ManagementPage = async ({ params }: { params: { roomId: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    redirect('/');
  }

  const roomId = params.roomId;
  if (!roomId) {
    redirect('/work-space');
  }

  const applicantAuthor = await getApplicantAuthor(roomId);
  const participatingAuthors: IParticipatingAuthor[] & callApiResponse = await callApi({
    url: `/api/v1/novel-rooms/${roomId}/participants`,
    method: 'GET',
    token: session?.user?.token,
  });
  const recruitment = await getRecruitmentId(roomId);

  if (participatingAuthors.statusCode && participatingAuthors.statusCode === 404) {
    redirect('/work-space');
  }

  console.log({ recruitment: recruitment[0]?.id });
  return (
    <ManagementTemplate
      applicantAuthor={applicantAuthor}
      participatingAuthors={participatingAuthors}
      recruitment={recruitment[0]}
    />
  );
};

export default ManagementPage;
