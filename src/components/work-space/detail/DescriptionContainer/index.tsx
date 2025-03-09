interface DescriptionContainerProps {
  title: string;
  content: string;
  isEditable: boolean;
  date?: string;
  onChangeDescription: (description: string) => void;
}

export const DescriptionContainer = ({
  title,
  isEditable,
  content,
  date,
  onChangeDescription,
}: DescriptionContainerProps) => {
  return (
    <div className="bg-white-opacity-50 rounded-[10px] py-4 px-8 relative w-full h-full overflow-y-auto min-h-[98px]">
      <div className={`pb-2 w-full ${date ? 'flex justify-between items-center' : ''}`}>
        <p className="text-sm text-black1">{title}</p>
        {date && <p className="text-[8px] text-blue1">{date}</p>}
      </div>

      {!isEditable ? (
        <p className="text-sm text-black2">{content}</p>
      ) : (
        <textarea
          onChange={e => onChangeDescription(e.target.value)}
          className="block bg-white/0 rounded-b-[10px] border-[black] border-[1px] h-[98px] text-sm text-black2 resize-none w-full p-2"
          defaultValue={content}
          cols={999}
        />
      )}
    </div>
  );
};
