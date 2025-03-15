import { NextResponse } from "next/server";
import { createHandler  } from "@premieroctet/next-admin/appHandler";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/shared/utils/email";

interface UpdateEvent {
  params: {
    model: string;
    data: {
      title?: string;
      updated_by_id?: number;
    };
    where: {
      id: number;
    };
  };
}

const {run} = createHandler({
  prisma,
  apiBasePath: "/api/admin",
  // @ts-ignore
  hooks: {
    beforeUpdate: async (event: UpdateEvent) => {
      const { model, data, where } = event.params;
      
      if (model === 'articles') {
        // // 이전 article 데이터 가져오기
        // const previousArticle = await prisma.articles.findUnique({
        //   where: { id: where.id },
        //   include: {
        //     admin_users_articles_created_by_idToadmin_users: true,
        //     admin_users_articles_updated_by_idToadmin_users: true
        //   }
        // });

        // if (previousArticle) {
        //   const updatedBy = data.updated_by_id ? 
        //     await prisma.admin_users.findUnique({ where: { id: data.updated_by_id } }) : 
        //     previousArticle.admin_users_articles_updated_by_idToadmin_users;
        //   const createdBy = previousArticle.admin_users_articles_created_by_idToadmin_users;

        //   if (updatedBy && createdBy && updatedBy.id !== createdBy.id && createdBy.email) {
        //     const emailContent = `
        //       <h2>게시글이 수정되었습니다</h2>
        //       <p>제목: ${data.title || previousArticle.title}</p>
        //       <p>수정자: ${updatedBy.firstname} ${updatedBy.lastname}</p>
        //       <p>수정일시: ${new Date().toLocaleString()}</p>
        //     `;

        //     await sendEmail({
        //       to: createdBy.email,
        //       subject: '[Garden of Writer] 게시글이 수정되었습니다',
        //       html: emailContent
        //     });
        //   }
        // }
      }
    }
  }
});

export const GET = run;
export const POST = run;
export const PUT = run;
export const DELETE = run; 