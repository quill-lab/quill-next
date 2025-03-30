export interface CharacterInfo {
  id: string;
  name: string;
  description: string;
}

export type GetCharactersInfoResponse = { data: CharacterInfo[] };
