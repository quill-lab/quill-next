import { authOptions } from '@/authOptions';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import WorkSpaceTemplate from '@/components/templates/WorkSpaceTemplate';
import { apiConfig, apiUrl } from '@/shared/utils/envConfig';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const WorkSpacePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const res = await fetch(apiUrl + '/api/v1/users/me/novel-rooms?size=1&sort=OLDEST', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + session?.user?.token,
    },
  });

  if (res.status === 401) {
    redirect('/');
  }

  const workSpaceList = await res.json();

  return (
    <WorkSpaceTemplate
      items={workSpaceList.items}
      totalCount={workSpaceList.totalCount}
      size={workSpaceList.size}
      page={workSpaceList.page}
    />
  );
};

export default WorkSpacePage;
