const EpisodeList = () => {
  return (
    <table className="w-full">
      <thead className="w-full text-center">
        <tr className="text-[#2d2d2d] text-[14px] font-[500] font-spoqa">
          <th className="py-[16px]">회차</th>
          <th>제목</th>
          <th>최종작성일</th>
          <th>상태</th>
          <th>연재승인일</th>
          <th>조회수</th>
          <th>댓글</th>
          <th>좋아요</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colSpan={8}>
            <button className="w-full py-[14px] border-[0.6px] border-[#059EAF] bg-[white] rounded-[100px] text-[#059eaf] text-[14px] font-[500]">
              다음 회차 생성하기
            </button>
          </td>
        </tr>
      </tbody>

      <tbody className="text-center text-[#059EAF] text-[14px] font-[500]">
        <tr>
          <td className="py-[16px]">1</td>
          <td>프롤로그</td>
          <td>2023.7.6</td>
          <td>연재 검토중</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td className="py-[16px]">2</td>
          <td>프롤로그</td>
          <td>2023.7.6</td>
          <td>연재 검토중</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  );
};

export default EpisodeList;
