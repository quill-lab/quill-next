interface ChapterItemProps {
  text: string;
}

const ChapterItem = ({ text }: ChapterItemProps) => {
  return (
    <div
      className="w-full bg-[#E7F6F8] focus-within:bg-[#059EAF] focus-within:text-[#E7F6F8] focus-within:outline-none text-[14px] font-[400] leading-[22px] text-[#059EAF] px-[24px] py-[16px] rounded-[20px] rounded-br-[0px] pt-[38px] pb-[12px] px-[32px] resize-none"
      contentEditable={true}
    >
      {text}
    </div>
  );
};

export default ChapterItem;
