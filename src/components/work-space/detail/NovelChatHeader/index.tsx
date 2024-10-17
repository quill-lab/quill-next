export const NovelChatHeader = ({ title, onEdit }: { title: string; onEdit: () => void }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="flex flex-row items-center">
        <input
          className="text-black text-base font-medium border-none outline-none"
          value={title}
          readOnly
        />
        <button
          className="w-[52px] h-4 rounded-full bg-blue-500 text-white text-xs font-normal flex items-center justify-center cursor-pointer"
          onClick={onEdit}
        >
          수정하기
        </button>
      </div>
      <p className="text-black text-base font-medium">작성중</p>
    </div>
  );
};
