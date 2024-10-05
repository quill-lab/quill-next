/**
 * '\n'을 포함한 텍스트를 넘기면 br 태그를 포함한 텍스트로 리턴
 * @param text
 */
export const convertNewlineToBr = (text: string) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br />');
};
