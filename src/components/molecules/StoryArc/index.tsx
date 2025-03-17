import { StoryArc as IStoryArc } from '@/shared';
import { storyArcWrapper } from '@/shared/constant/storyArc';
import dayjs from 'dayjs';

interface StoryArcProps {
  arc: IStoryArc;
  editMode: boolean;
  onChangeDescription: (newValue: string) => void;
  handleChangeChapter: ({
    key,
    valueKey,
    newValue,
  }: {
    key: 'INTRODUCTION' | 'DEVELOPMENT' | 'CRISIS' | 'CLIMAX' | 'RESOLUTION';
    valueKey: 'firstChapterNumber' | 'lastChapterNumber';
    newValue: number;
  }) => void;
}

export default function StoryArc({
  arc,
  editMode,
  onChangeDescription,
  handleChangeChapter,
}: StoryArcProps) {
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

      {editMode ? (
        <p>
          <p className="py-[8px] font-spoqa text-[#2D2D2D] text-[14px] font-[400] leading-[22px]">
            <input
              className="border border-[1px] text-center w-[36px]"
              onChange={e =>
                handleChangeChapter({
                  key: arc.phase,
                  valueKey: 'firstChapterNumber',
                  newValue: parseInt(e.target.value),
                })
              }
              type="number"
              defaultValue={arc.firstChapterNumber || 0}
            />
            화 ~{' '}
            <input
              className="border border-[1px] text-center w-[36px]"
              onChange={e =>
                handleChangeChapter({
                  key: arc.phase,
                  valueKey: 'lastChapterNumber',
                  newValue: parseInt(e.target.value),
                })
              }
              type="number"
              defaultValue={arc.lastChapterNumber || 0}
            />
            화
          </p>
        </p>
      ) : (
        <p className="py-[8px] font-spoqa text-[#2D2D2D] text-[14px] font-[400] leading-[22px]">
          {arc.firstChapterNumber && arc.lastChapterNumber
            ? `${arc.firstChapterNumber}화 ~ ${arc.lastChapterNumber}화`
            : '00화 ~ 00화'}
        </p>
      )}

      {editMode ? (
        <textarea
          className="w-full p-2 border rounded-md h-[160px]"
          defaultValue={arc.description || storyArcWrapper[arc.phase].tip}
          onChange={e => onChangeDescription(e.target.value)}
        />
      ) : (
        <p className="py-[8px] font-spoqa text-[#2D2D2D] text-[14px] font-[400] leading-[22px]">
          {arc.description || storyArcWrapper[arc.phase].tip}
        </p>
      )}
    </div>
  );
}
