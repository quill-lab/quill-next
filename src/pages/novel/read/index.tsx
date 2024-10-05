import throttle from 'lodash/throttle';
import { ReactElement, useState, WheelEvent } from 'react';

import CommentSend from '@/components/CommentSend/CommentSend';
import NovelComment from '@/components/NovelComment/NovelComment';
import NovelReaderNavi from '@/components/NovelReaderNavi/NovelReaderNavi';

import st from './NovelRead.module.scss';

const comm = [
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비',
  },
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비2',
  },
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비3',
  },
  {
    comment: '다음에 운동 같이 해요',
    date: '23.23.23',
    nickName: '김무자비4',
  },
];
export default function NovelRead(): ReactElement {
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const [scrollUp, setScrollUp] = useState<boolean>(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll); // clean up
  //   };
  // }, []);
  // const handleScroll = () => {
  //   // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
  //   if (window.scrollY >= 100) {
  //     setScrollDown(true);
  //     console.log('yoo');
  //   } else {
  //     // 스크롤이 50px 미만일경우 false를 넣어줌
  //     setScrollDown(false);
  //   }
  // };
  function handleOnWheel(e: WheelEvent<HTMLDivElement>) {
    if (e.nativeEvent.deltaY > 0) {
      // scroll down event
      setScrollDown(true);
      setScrollUp(false);
      // setHide(false);
    } else {
      // scroll up event
      setScrollDown(false);
      setScrollUp(true);
      // setHide(true)
    }
  }

  const wheelEvent = throttle(handleOnWheel, 1000);
  return (
    <div className={st.main} onWheel={wheelEvent}>
      <div className={st.main_title}>
        <p>재벌집 아이들</p>
        <p>999화 헬창의 삶</p>
      </div>

      <div className={st.novelText}>
        <p>
          아침에 일어났다. 잠 자는 동안 발생했던 근손실을 메꾸기 위해 단백질 쉐이크 1kg을 마셨다.
        </p>
        <p>집중이 안 된다. 졸리다. 지금은 몇시인가.</p>
        <p>한강에 가서 라면 먹고 싶다. 지금이 딱 좋은 시기인데</p>
        <p>아니.. 마음이 바뀌었다.. 안 갈래...가면 뭐하나 다 커플인데.</p>
        <p>스크롤 테스트를 해야한다. 내용이 부족하다</p>
        <p>평행세계에 나는 뭘 하고 있을까. 행복하니?</p>
        <p>구글은 얼마나 똑똑한거냐. 열심히 했으니까 똑똑한 거겠지?</p>
        <p>네이버 질문 게시판에 유 씨로 예쁜 이름을 지어달라고 하더라</p>
        <p>좋은 이름이 떠올랐다. 괴롭히는 친구들을 혼내주라는 의미로</p>
        <p>유다이 어떤가</p>
        <p>오 드디어 스크롤이 생겼다</p>
        <p>아 잠깐 딴짓했더니 1시간이 흘렀다</p>
        <p>스크롤 길이가 부족하네.. 더 써야하네</p>
        <p>저의 취미는 일렉기타입니다</p>
        <p>왜 말하냐구요? 방금 또 딴짓해서 한시간이 흘렀거든요 찡긋 {'>'}_-</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>

        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
        <p>인간 시대의 끝이 도래했따</p>
      </div>

      <div className={st.main_commentCount}>댓글 2</div>

      {comm.map(i => (
        <NovelComment key={i.nickName} {...i} />
      ))}

      <CommentSend />

      <NovelReaderNavi isDown={scrollDown} isUp={scrollUp} />
    </div>
  );
}
