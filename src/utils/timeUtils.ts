export const getMessageTime = (createdAt: string) => {
  const messageDate = new Date(createdAt);
  const hours = messageDate.getHours().toString().padStart(2, '0'); // 한 자리 수일 경우 앞에 0 추가
  const minutes = messageDate.getMinutes().toString().padStart(2, '0'); // 한 자리 수일 경우 앞에 0 추가
  return `${hours}:${minutes}`;
};
