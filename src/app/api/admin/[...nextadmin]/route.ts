import { createHandler } from '@premieroctet/next-admin/appHandler';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/shared/utils/email'; // 이메일 보내는 함수
import { NextAdminOptions } from '@premieroctet/next-admin';

const options: NextAdminOptions = {
  model: {
    chapters: {
      title: 'Chapters',
      toString: chapter => `${chapter.title}`,
      edit: {
        display: ['title', 'status', 'content'],
        hooks: {
          async afterDb(data, mode, request) {
            const chapterId = request.url?.split('chapters/')[1];

            if (data.data.status === 'APPROVED') {
              const novel = await prisma.chapters.findFirst({
                where: {
                  id: data.data.id,
                },
                select: {
                  chapter_number: true,
                  novels: {
                    select: {
                      title: true,
                      contributor_groups: {
                        select: {
                          id: true,
                          contributors: {
                            where: {
                              role: 'MAIN',
                            },
                            select: {
                              account_id: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });

              const account = await prisma.accounts.findFirst({
                where: {
                  id: novel?.novels?.contributor_groups[0]?.contributors[0]?.account_id,
                },
                select: {
                  email: true,
                },
              });

              const mailOptions = {
                from: process.env.GMAIL_USER,
                to: account?.email || '',
                subject: `${novel?.novels?.title} 연재 승인`,
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                  <h2>${novel?.novels?.title} - ${novel?.chapter_number}회차 연재가 승인되었습니다</h2>
                  <p>확인하시려면 아래 버튼을 클릭해주세요:</p>
                  <a href="https://quill-next-two.vercel.app/work-space/detail${novel?.novels?.contributor_groups[0]?.id}/episode" 
                     target="_blank"
                     style="
                       display: inline-block;
                       padding: 10px 20px;
                       background-color: #4CAF50;
                       color: white;
                       text-decoration: none;
                       border-radius: 5px;
                     ">
                    지원자 확인하기
                  </a>
                </div>
              `,
              };

              sendEmail(mailOptions);
            }
            return data;
          },
        },
      },
    },
  },
};

const { run, router } = createHandler({
  async onRequest(req, ctx) {
    console.log({ req, ctx: await ctx.params });
  },
  prisma,
  options,
  apiBasePath: '/api/admin',
});

export const GET = run;
export const POST = run;
export const PUT = run;
export const DELETE = run;
