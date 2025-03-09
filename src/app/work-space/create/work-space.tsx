'use client';

import { FormEvent, useState } from 'react';

import CategorySelect from '@/components/CategorySelect/CategorySelect';
import HashTagInput from '@/components/HashTagInput/HashTagInput';
import { WritingModeSelector, OneLineInput, MultilineInput, BookCoverSelector } from '@/components';
import { useCreateNovelPost } from '@/stores/useCreateNovelPost.zst';

import { WritingModeType } from '@/shared';

export default function WorkSpace() {
  const [writingMode, setWritingMode] = useState<WritingModeType>('collaborate');
  const { setNovel, ...props } = useCreateNovelPost();

  const handleChangeWritingMode = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value as WritingModeType;
    setWritingMode(inputValue);

    if (inputValue === 'solo') {
      setNovel({ type: 1 });
    } else {
      setNovel({ type: 2 });
    }
  };

  const handleChangePeopleCount = (value: number) => {
    if (value === 2 || value === 3 || value === 4 || value === 5) {
      setNovel({ type: value });
    }
  };

  const handleChangeTitle = (title: string) => {
    setNovel({
      title,
    });
  };

  const handleChangeDescription = (subTitle: string) => {
    setNovel({
      subTitle,
    });
  };

  return (
    <>
      <p className={'text-3xl mb-1 font-medium'}>1.소설공방 개설</p>
      <p className={'text-base text-gray2 mb-12'}>
        작가들을 모집하고 새로운 세계관을 만들어보세요.
      </p>
      <WritingModeSelector
        onChange={handleChangeWritingMode}
        writingMode={writingMode}
        handleChangePeopleCount={handleChangePeopleCount}
      />
      <div className={'mt-12'}>
        <OneLineInput
          onChange={handleChangeTitle}
          compulsory={props.titleCheck.essential}
          categoryText="제목"
          tooltipText={`소설의 제목을 정해주세요.\n개설 이후에는 수정이 불가능합니다.`}
          placeholder="소설의 제목을 작성해주세요."
          errorText={props.titleCheck.errorMsg}
          isError={props.titleCheck.isError}
        />
      </div>
      <div className={'mt-8'}>
        <OneLineInput
          onChange={handleChangeDescription}
          compulsory={props.subTitleCheck.essential}
          categoryText="한줄 소개"
          placeholder="소설의 내용을 한줄로 간단하게 작성해 주세요."
          errorText={props.subTitleCheck.errorMsg}
          isError={props.subTitleCheck.isError}
        />
      </div>
      <div className={'mt-8'}>
        <CategorySelect
          compulsory={props.categoryCheck.essential}
          isError={props.categoryCheck.isError}
          errorText={props.categoryCheck.errorMsg}
        />
      </div>
      <div className={'mt-8'}>
        <HashTagInput
          onChange={tags => setNovel({ novelTag: tags })}
          categoryText="태그"
          compulsory={props.novelTagCheck.essential}
          errorText={props.novelTagCheck.errorMsg}
          isError={props.novelTagCheck.isError}
        />
      </div>
      <div className={'mt-5'}>
        <MultilineInput
          onChange={value => {
            setNovel({ summary: value });
          }}
          compulsory={props.summaryCheck.essential}
          categoryText="줄거리"
          tooltipText={`소설의 줄거리를 기승전결에\n따라 입력해주세요.`}
          placeholder={`(예시)\n기 :로미오와 줄리엣이 만나 첫눈에 사랑에 빠진다.\n승 :로미오와 줄리엣은 부모 몰래 결혼식을 올린다.\n전 :우연히 로미오가 줄리엣의 사촌을 죽이면서 도시 베로나에서 추방 당한다.\n결 :재회하지 못한 둘은 결국 자살한다.`}
          errorText={props.summaryCheck.errorMsg}
          isError={props.summaryCheck.isError}
        />
      </div>
      <BookCoverSelector />
    </>
  );
}
