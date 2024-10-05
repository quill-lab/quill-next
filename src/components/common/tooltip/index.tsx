import React from 'react';
import { convertNewlineToBr } from '@/shared';

interface TooltipProps {
  show: boolean;
  tooltipText: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ show, tooltipText, position = 'top' }: TooltipProps) => {
  if (!show || !tooltipText) return null;

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  // TODO: 지금은 right만 제대로 적용. 사용할 때 설정하라
  const borderRadiusClasses = {
    top: 'rounded-t-[24px] rounded-b-none',
    bottom: 'rounded-b-lg rounded-t-none',
    left: 'rounded-l-lg rounded-r-none',
    right: 'rounded-r-[20px] rounded-tl-[20px]',
  };

  return (
    <div className="relative">
      <div
        className={`${positionClasses[position]} ${borderRadiusClasses[position]} font-medium text-center bg-white2 absolute text-blue2 text-gray-700 text-sm p-3 border-[0.5px] border-black1 min-w-[256px] whitespace-normal`}
      >
        <span
          className={'text-xs'}
          dangerouslySetInnerHTML={{ __html: convertNewlineToBr(tooltipText) }}
        />
      </div>
    </div>
  );
};
