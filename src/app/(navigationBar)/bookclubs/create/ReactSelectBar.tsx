import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const colourOptions = [
  { value: '월', label: '월' },
  { value: '화', label: '화' },
  { value: '수', label: '수' },
  { value: '목', label: '목' },
  { value: '금', label: '금' },
  { value: '토', label: '토' },
  { value: '일', label: '일' }
];

export default function ReactSelectBar() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      //   defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
      placeholder='북클럽 요일을 정해주세요(중복선택 가능)'
      className='text-[14px] h-[48px] custom-select rounded-lg w-full'
    />
  );
}
