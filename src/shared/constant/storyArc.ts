import { StoryArcWrapper } from '../interface/storyArc';

export const storyArcWrapper: StoryArcWrapper = {
  INTRODUCTION: {
    phaseAlias: '발단',
    tip: 'Tip. “이야기의 시공간적 배경을 간략하게 설명하여 독자에게 필수적인 정보를 제공하세요.”',
  },

  DEVELOPMENT: {
    phaseAlias: '전개',
    tip: 'Tip. "전개에서는 이야기가 본격적으로 움직이기 시작합니다. 인물들이 구체적인 문제나 사건과 마주치는 모습을 보여주세요."',
  },

  CRISIS: {
    phaseAlias: '위기',
    tip: `Tip. "해결책이 보이지 않는 막다른 상황을 통해 독자가 '이제 어떻게 될까?'라는 궁금증을 갖게 하세요."`,
  },

  CLIMAX: {
    phaseAlias: '절정',
    tip: `Tip. "절정은 이야기의 가장 중요한 순간입니다. 주인공이 최종 문제를 해결하거나 운명을 결정짓는 장면을 보여주세요."`,
  },

  RESOLUTION: {
    phaseAlias: '결말',
    tip: `Tip. "주인공의 성장과 문제 해결 과정을 보여주어 독자가 성취감을 느끼게 하세요."`,
  },
};
