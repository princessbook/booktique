import MyNicknameForm from '@/components/nickname/MyNicknameForm';
import React from 'react';

const RegisterNickname = (props: { params: { id: string } }) => {
  const id = props.params.id;
  console.log(id);
  return <MyNicknameForm />;
};

export default RegisterNickname;
