export const NovelActionButtons = ({
  onNext,
  onPublish,
}: {
  onNext: () => void;
  onPublish: () => void;
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-[46px] py-8">
      <button className="w-[200px] h-[48px] bg-blue-500 text-white rounded-lg" onClick={onNext}>
        다음 회차 생성
      </button>
      <button
        className="w-[200px] h-[48px] bg-white text-black rounded-lg border"
        onClick={onPublish}
      >
        연재신청
      </button>
    </div>
  );
};
