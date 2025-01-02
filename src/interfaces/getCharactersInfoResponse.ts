export interface CharacterInfo {
  name: string;
  description: string;
  updatedAt: string;
  lastModifier: string;
}

export type GetCharactersInfoResponse = CharacterInfo[];
