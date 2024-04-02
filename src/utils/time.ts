export const extractDate = (isoDateString: string) => {
  const datePart = isoDateString.split('T')[0];
  return datePart;
};

export const addOneMonth = (dateString: string) => {
  const date = new Date(dateString);
  let newMonth = date.getMonth() + 1;
  let newYear = date.getFullYear();

  // 다음 달이 13월인 경우
  if (newMonth > 11) {
    newYear++;
    newMonth = 0; // 0부터 시작하는 인덱스이므로 12월 대신 0을 설정합니다.
  }

  // 날짜를 조정하여 한 달 후의 날짜를 계산합니다.
  date.setFullYear(newYear, newMonth);
  const newDateString = date.toISOString();

  // ISO 8601 형식의 날짜 문자열에서 "T" 이후의 부분을 제거합니다.
  return newDateString.split('T')[0];
};
