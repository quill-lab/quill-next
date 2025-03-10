'use client';

import StoryArc from '@/components/molecules/StoryArc';
import WorkSpaceTabHeader from '@/components/organisms/WorkSpaceTabHeader';
import { StoryArc as IStoryArc } from '@/shared';
import callApi from '@/shared/utils/fetchWrapper';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface PlanTemplateProps {
  storyArcs: IStoryArc[];
}

export default function PlanTemplate({ storyArcs }: PlanTemplateProps) {
  const params = useParams();
  const roomId = params?.roomId;
  const { data: session } = useSession();

  const [editMode, setEditMode] = useState(false);
  const [arcs, setArcs] = useState(storyArcs);

  const handleChange = (index: number, newValue: string) => {
    setArcs(prevArcs =>
      prevArcs.map((arc, i) => (i === index ? { ...arc, description: newValue } : arc))
    );
  };

  const handleEditBtn = async () => {
    if (editMode) {
      const arcsRequest = arcs.map(arc => {
        callApi({
          url: `/api/v1/novel-rooms/${roomId}/story-arcs/${arc.phase}`,
          method: 'PATCH',
          body: { description: arc.description },
          token: session?.user?.token,
        });
      });

      await Promise.all(arcsRequest);
    }

    setEditMode(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col gap-[8px]">
        <WorkSpaceTabHeader currentTab="plan" />
        {arcs.map((arc, index) => (
          <StoryArc
            key={arc.phase}
            arc={arc}
            editMode={editMode}
            onChange={newValue => handleChange(index, newValue)}
          />
        ))}
      </div>
      <button
        className="max-w-[204px] mt-[18px] rounded-[62px] bg-[#E7F6F8] py-[16px] px-[76px] text-[#059EAF] text-center font-spoqa text-[14px] font-[500]"
        onClick={handleEditBtn}
      >
        {editMode ? '저장하기' : '수정하기'}
      </button>
    </div>
  );
}
