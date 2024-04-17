export const validateEmail = (inputEmail: string) => {
  // Email 형식 유효성 검사
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(inputEmail);
};
export const validatePassword = (inputPassword: string) => {
  // 비밀번호 형식 유효성 검사
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return regex.test(inputPassword);
};
