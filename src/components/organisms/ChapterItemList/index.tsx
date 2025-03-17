import ChapterItem from '@/components/molecules/ChapterItem';

const itemList = [
  {
    id: 1,
    text: `오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 경고를 주고 있음이 분명하다는 것, 그리고 이별의 감정과 눈물의 분명한 존재는 의심의 여지없이 호소로 바뀌며 끝날 것이라는 오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 
내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 오직, 때때로 어오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 경고를 주고 있음이 분명하다는 것, 그리고 이별의 감정과 눈물의 분명한 존재는 의심의 여지없이 호소로 바뀌며 끝날 것이라는 오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고`,
  },
  {
    id: 2,
    text: `오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 경고를 주고 있음이 분명하다는 것, 그리고 이별의 감정과 눈물의 분명한 존재는 의심의 여지없이 호소로 바뀌며 끝날 것이라는 오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 
내게 알려주고 있었다`,
  },
  {
    id: 3,
    text: `사비나가 안드레스에게 마시막 충고와 오직, 때때로 어오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 경고를 주고 있음이 분명하다는 것, 그리고 이별의 감정과 눈물의 분명한 존재는 의심의 여지없이 호소로 바뀌며 끝날 것이라는 오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고 사비나가 안드레스에게 마시막 충고와 오직, 때때로 어오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 경고를 주고 있음이 분명하다는 것, 그리고 이별의 감정과 눈물의 분명한 존재는 의심의 여지없이 호소로 바뀌며 끝날 것이라는 오직, 때때로 어떤 불분명하고 희미한 종얼거림이 `,
  },
  {
    id: 4,
    text: `“사바나에게 돈이 있다는걸 난 알고있어.”`,
  },
];

const ChapterItemList = () => {
  return (
    <div className="w-full mt-[10px] flex flex-col gap-[16px] rounded-[10px] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)] bg-[rgba(255, 255, 255, 0.50)]">
      {itemList.map(item => (
        <ChapterItem key={item.id} text={item.text} />
      ))}
    </div>
  );
};

export default ChapterItemList;
