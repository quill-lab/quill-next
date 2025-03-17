export interface StoryArcPhase {
  phaseAlias: string;
  tip: string;
}

export type StoryArcWrapper = {
  [key: string]: StoryArcPhase;
};
