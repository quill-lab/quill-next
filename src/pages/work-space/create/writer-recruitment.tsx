import { OneLineInput, MultilineInput } from '@/components';
import { useCreateNovelPost } from '@/stores/useCreateNovelPost.zst';

export default function WriterRecruitment() {
  const { postTitleCheck, postContentCheck, openLinkCheck, setPost } = useCreateNovelPost();

  const handleChangeTitle = (postTitle: string) => {
    setPost({ postTitle });
  };

  const handleChangeContent = (postContent: string) => {
    setPost({
      postContent,
    });
  };

  const handleChangeLink = (openLink: string) => {
    setPost({
      openLink,
    });
  };

  return (
    <>
      <p className={'text-3xl font-medium'}>02.작가 모집 게시글 작성</p>
      <p className={'text-base text-gray2 pt-1'}>작가들을 모집하고 새로운 세계관을 만들어보세요.</p>
      <div className={'mt-[84px]'}>
        <OneLineInput
          onChange={handleChangeTitle}
          compulsory={postTitleCheck.essential}
          categoryText="모집 제목"
          placeholder="(예시)12월 목표로 판타지 소설 작성해 보실분 구해요!"
          errorText={postTitleCheck.errorMsg}
          isError={postTitleCheck.isError}
          tooltipText={`함께 소설을 작성하실 작가를\n모집하는 게시글의 제목입니다.`}
        />
      </div>
      <div className={'mt-7'}>
        <MultilineInput
          onChange={handleChangeContent}
          compulsory={postContentCheck.essential}
          categoryText="작가 모집 내용"
          tooltipText={`함께 소설을 작성하실 작가를 모집하는 게\n시글의 내용입니다.`}
          placeholder={`(예시) 제목은 ‘OOO’이구요. 평일 모두 시간되시는 분 선호하고 잠수 시 강제 퇴장합니다. 오픈 채팅으로 연락 주세요.`}
          errorText={postContentCheck.errorMsg}
          isError={postContentCheck.isError}
        />
      </div>
      <div className={'mt-20'}>
        <OneLineInput
          onChange={handleChangeLink}
          compulsory={openLinkCheck.essential}
          categoryText="오픈채팅 링크"
          placeholder="(예시)https://open.kakao.com/xxxxxxxxxxx"
          errorText={openLinkCheck.errorMsg}
          isError={openLinkCheck.isError}
          tooltipText={`작가모집 게시글을 보고 작가 분들이 해당\n링크로 연락을 할 수 있습니다. 카카오톡 오\n픈채팅방 (1:1 채팅방) 생성 후 링크를 기입\n해 주세요.`}
        />
      </div>
    </>
  );
}
