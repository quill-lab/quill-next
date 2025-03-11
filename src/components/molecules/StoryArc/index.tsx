import { StoryArc as IStoryArc } from '@/shared';
import dayjs from 'dayjs';

interface StoryArcPhase {
  phaseAlias: string;
  tip: string;
}

type StoryArcWrapper = {
  [key: string]: StoryArcPhase;
};

const storyArcWrapper: StoryArcWrapper = {
  INTRODUCTION: {
    phaseAlias: '발단',
    tip: 'Tip. “이야기의 시공간적 배경을 간략하게 설명하여 독자에게 필수적인 정보를 제공하세요.”',
  },

  DEVELOPMENT: {
    phaseAlias: '전개',
    tip: 'Tip. "전개에서는 이야기가 본격적으로 움직이기 시작합니다. 인물들이 구체적인 문제나 사건과 마주치는 모습을 보여주세요."',
  },

  CRISIS: {
    phaseAlias: '위기',
    tip: `Tip. "해결책이 보이지 않는 막다른 상황을 통해 독자가 '이제 어떻게 될까?'라는 궁금증을 갖게 하세요."`,
  },

  CLIMAX: {
    phaseAlias: '절정',
    tip: `Tip. "절정은 이야기의 가장 중요한 순간입니다. 주인공이 최종 문제를 해결하거나 운명을 결정짓는 장면을 보여주세요."`,
  },

  RESOLUTION: {
    phaseAlias: '결말',
    tip: `Tip. "주인공의 성장과 문제 해결 과정을 보여주어 독자가 성취감을 느끼게 하세요."`,
  },
};

interface StoryArcProps {
  arc: IStoryArc;
  editMode: boolean;
  onChange: (newValue: string) => void;
}

export default function StoryArc({ arc, editMode, onChange }: StoryArcProps) {
  return (
    <div className="w-full flex flex-col px-[32px] py-[8px] bg-white/50 rounded-[12px] mr-[24px]">
      <div className="flex justify-between items-center">
        <p className="py-[8px] font-spoqa text-[#2D2D2D] text-[14px] font-[500]">
          {arc.phaseAlias}
        </p>
        {arc.lastModifiedAt && (
          <p className="text-[#059EAF] text-[8px] font-[400] font-spoqa px-[32px]">
            수정됨 {dayjs(arc.lastModifiedAt).format('YYYY.M.D')}
          </p>
        )}
      </div>

      <p className="py-[8px] font-spoqa text-[#2D2D2D] text-[14px] font-[400] leading-[22px]">
        {arc.firstChapterNumber && arc.lastChapterNumber
          ? `${arc.firstChapterNumber}화 ~ ${arc.lastChapterNumber}화`
          : '00화 ~ 00화'}
      </p>

      {editMode ? (
        <textarea
          className="w-full p-2 border rounded-md h-[160px]"
          defaultValue={arc.description || storyArcWrapper[arc.phase].tip}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <p className="py-[8px] font-spoqa text-[#2D2D2D] text-[14px] font-[400] leading-[22px]">
          {arc.description || storyArcWrapper[arc.phase].tip}
        </p>
      )}
    </div>
  );
}
