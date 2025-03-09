export interface CharacterInfo {
  name: string;
  description: string;
}

export type GetCharactersInfoResponse = { data: CharacterInfo[] };
