export function dateChanger(dt: string | null) {
  if (!dt) {
    return '-';
  }
  return dt.split(' ')[0];
}
