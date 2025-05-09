import { authOptions } from '@/authOptions';
import PlanTemplate from '@/components/templates/PlanTemplate';
import { StoryArc } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function PlanPage({ params }: { params: { roomId: string } }) {
  const roomId = params?.roomId;
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    redirect('/');
  }

  if (!roomId) {
    redirect('/work-space');
  }

  const storyArcs: StoryArc[] & callApiResponse = await callApi({
    url: `/api/v1/novel-rooms/${roomId}/story-arcs`,
    method: 'GET',
    token: session?.user?.token,
  });

  if (storyArcs.statusCode && storyArcs.statusCode === 401) {
    redirect('/');
  }

  return <PlanTemplate storyArcs={storyArcs} />;
}
