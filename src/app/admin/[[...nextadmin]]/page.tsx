import { NextAdmin, PageProps } from '@premieroctet/next-admin';
import { getNextAdminProps } from '@premieroctet/next-admin/appRouter';
import { prisma } from '@/lib/prisma';

export default async function AdminPage({ params, searchParams }: PageProps) {
  // Prisma Client 연결 테스트
  try {
    await prisma.$connect();
    console.log('Prisma Client connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection failed');
  }

  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: '/admin',
    apiBasePath: '/api/admin',
    prisma,
  });

  return (
    <NextAdmin
      {...props}
      // models={{
      //   articles: {
      //     displayName: "게시글",
      //     properties: {
      //       id: { type: "number", title: "ID" },
      //       title: { type: "string", title: "제목" },
      //       sub_title: { type: "string", title: "부제목" },
      //       content: { type: "string", title: "내용", isLongText: true },
      //       created_at: { type: "datetime", title: "생성일" },
      //       updated_at: { type: "datetime", title: "수정일" },
      //       published_at: { type: "datetime", title: "발행일" }
      //     }
      //   },
      //   subscribers: {
      //     displayName: "구독자",
      //     properties: {
      //       id: { type: "number", title: "ID" },
      //       email: { type: "string", title: "이메일" },
      //       created_at: { type: "datetime", title: "생성일" }
      //     }
      //   },
      //   files: {
      //     displayName: "파일",
      //     properties: {
      //       id: { type: "number", title: "ID" },
      //       name: { type: "string", title: "파일명" },
      //       url: { type: "string", title: "URL" },
      //       mime: { type: "string", title: "MIME 타입" },
      //       size: { type: "number", title: "크기" },
      //       created_at: { type: "datetime", title: "생성일" }
      //     }
      //   },
      //   upload_folders: {
      //     displayName: "폴더",
      //     properties: {
      //       id: { type: "number", title: "ID" },
      //       name: { type: "string", title: "폴더명" },
      //       path_id: { type: "number", title: "경로 ID" },
      //       path: { type: "string", title: "경로" }
      //     }
      //   }
      // }}
    />
  );
}
