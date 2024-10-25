interface DescriptionContainerProps {
  title: string;
  content: string;
  isEditable: boolean;
  date?: string;
}

export const DescriptionContainer = ({
  title,
  isEditable,
  content,
  date,
}: DescriptionContainerProps) => {
  return (
    <div className={'bg-white-opacity-50 rounded-[10px] py-4 px-8 relative h-full overflow-y-auto'}>
      <div className={`pb-2 ${date ? 'flex justify-around items-center' : ''}`}>
        <p className={'text-sm text-black1'}>{title}</p>
        {date && <p className={'text-[8px] text-blue1'}>{date}</p>}
      </div>
      <p className={`text-sm text-black2 ${isEditable ? 'hidden' : ''}`}>{content}</p>
      <textarea
        className={`bg-white-opacity-50 absolute left-0 right-0 top-12 bottom-0 rounded-b-[10px]
    resize-none border-none outline-none p-3 
    text-[14px] leading-[20px]
    text-black-1 ${isEditable ? '' : 'hidden'}
  `}
        disabled={!isEditable}
        defaultValue={content}
      />
    </div>
  );
};
