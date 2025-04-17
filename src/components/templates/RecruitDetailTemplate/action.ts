'use server';

import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export const toggleLike = async (user_id = '', recruitment_id: string) => {
  const recruitUserLike = await prisma.recruitment_user_like.findFirst({
    where: {
      user_id,
      recruitment_id,
    },
  });

  const recruitmentData = await prisma.contributor_group_recruitments.findFirst({
    where: {
      id: recruitment_id,
    },
  });

  if (recruitUserLike) {
    await Promise.all([
      await prisma.recruitment_user_like.delete({
        where: {
          id: recruitUserLike.id,
        },
      }),

      await prisma.contributor_group_recruitments.update({
        where: {
          id: recruitmentData?.id,
        },
        data: {
          like: recruitmentData?.like && recruitmentData.like - 1,
        },
      }),
    ]);
  } else {
    await Promise.all([
      await prisma.recruitment_user_like.create({
        data: {
          user_id,
          recruitment_id,
        },
      }),

      await prisma.contributor_group_recruitments.update({
        where: {
          id: recruitmentData?.id,
        },
        data: {
          like: recruitmentData?.like ? recruitmentData.like + 1 : 1,
        },
      }),
    ]);
  }
};

export const submitJoinRecruitment = async (
  user_id = '',
  recruitment_id: string,
  user_email = ''
) => {
  console.log({ user_email });
  const contributorGroupRecruitments = await prisma.contributor_group_recruitments.findFirst({
    where: {
      id: recruitment_id,
    },
    select: {
      contributor_group_id: true,
      author: true,
    },
  });

  if (!contributorGroupRecruitments) {
    return;
  }

  if (contributorGroupRecruitments?.author?.email === user_email) {
    return { statusCode: 400 };
  }

  await prisma.contributor_requests.create({
    data: {
      account_id: user_id,
      contributor_group_id: contributorGroupRecruitments?.contributor_group_id,
      status: 'pending',
    },
  });

  // ✅ 메일 전송 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail', // 예시로 Gmail 사용 (SMTP 설정도 가능)
    auth: {
      user: process.env.GMAIL_USER, // .env에 설정
      pass: process.env.GMAIL_PASS,
    },
  });

  // ✅ 메일 내용 작성
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: contributorGroupRecruitments?.author?.email!, // 또는 사용자 이메일을 DB에서 조회해서 넣기
    subject: '작가 지원이 들어왔습니다.',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>새로운 작가 지원이 도착했습니다!</h2>
      <p>확인하시려면 아래 버튼을 클릭해주세요:</p>
      <a href="https://quill-next-two.vercel.app/recruit" 
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

  // ✅ 메일 보내기
  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 메일 전송 성공');
  } catch (error) {
    console.error('❌ 메일 전송 실패:', error);
  }

  return;
};
