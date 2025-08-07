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

  const handleChangeDescription = (description: string) => {
    setNovel({
      description,
    });
  };

  const handleChangePlanningIntent = (planningIntent: string) => {
    setNovel({
      planningIntent,
    });
  };

  const handleChangeBackground = (background: string) => {
    setNovel({
      background,
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
          tooltipText={`작성하고자 하는 소설에 어울리는\n제목을 정해주세요.`}
          placeholder="소설의 제목을 작성해주세요."
          errorText={props.titleCheck.errorMsg}
          isError={props.titleCheck.isError}
        />
      </div>
      <div className={'mt-4'}>
        <CategorySelect
          compulsory={props.categoryCheck.essential}
          isError={props.categoryCheck.isError}
          errorText={props.categoryCheck.errorMsg}
        />
      </div>
      <div className={'mt-4'}>
        <HashTagInput
          onChange={tags => setNovel({ novelTag: tags })}
          categoryText="키워드"
          tooltipText={`소설을 나타내는 주요 키워드를\n작성해 주세요.`}
          compulsory={props.novelTagCheck.essential}
          errorText={props.novelTagCheck.errorMsg}
          isError={props.novelTagCheck.isError}
        />
      </div>
      <div className="mt-4">
        <OneLineInput
          onChange={handleChangeDescription}
          compulsory={props.descriptionCheck.essential}
          categoryText="한줄 소개"
          placeholder="작품의 주제를 한 줄로 간단히 소개해 주세요."
          errorText={'한줄 소개를 입력해 주세요.'}
          isError={props.descriptionCheck.isError}
        />
      </div>
      <div className="mt-4">
        <OneLineInput
          onChange={handleChangePlanningIntent}
          compulsory={props.planningIntentCheck.essential}
          categoryText="기획의도"
          placeholder="작품을 기획하게 된 의도를 간단히 작성해 주세요."
          errorText={'기획의도를 입력해 주세요.'}
          isError={props.planningIntentCheck.isError}
        />
      </div>
      <div className="mt-4">
        <OneLineInput
          onChange={handleChangeBackground}
          compulsory={props.backgroundCheck.essential}
          categoryText="작품 배경"
          placeholder="작품의 배경을 간단히 작성해 주세요. ex) 세계관, 시대 등"
          errorText={'기획의도를 입력해 주세요.'}
          isError={props.backgroundCheck.isError}
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
