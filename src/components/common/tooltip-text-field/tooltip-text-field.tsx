import Image from 'next/image';
import { ReactElement, useState } from 'react';
import SpeechBubble from '@/images/speech-bubble.svg';
import st from './tooltip-text-field.module.scss';
import { convertNewlineToBr } from '@/shared';

export interface TooltipTextFieldProps {
  compulsory: boolean;
  categoryText: string;
  tooltipText?: string;
  children: ReactElement;
  style?: {
    marginTop?: string;
  };
}
// TODO: tooltipWrapper, tooltipLayout 등으로 이름 변경
export const TooltipTextField = ({
  compulsory,
  categoryText,
  tooltipText,
  children,
  style,
}: TooltipTextFieldProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div style={style} className={st.container}>
      <div className={st.catetoryInfos}>
        {compulsory ? (
          <p className={`${st.redColor} mr-[1.5px]`}>[필수]</p>
        ) : (
          <p className={`${st.grayColor} mr-[1.5px]`}>[선택]</p>
        )}
        <p className={'font-medium'}>{categoryText}</p>
        {tooltipText && (
          <Image
            className={st.ml4}
            onMouseOver={() => setShowTooltip(true)}
            onMouseOut={() => setShowTooltip(false)}
            src={SpeechBubble}
            alt="말풍선"
          />
        )}
        {showTooltip && tooltipText && (
          <div
            className={st.speechBubbleContainer}
            dangerouslySetInnerHTML={{ __html: convertNewlineToBr(tooltipText) }}
          />
        )}
      </div>
      <div className={'pl-3'}>{children}</div>
    </div>
  );
};
