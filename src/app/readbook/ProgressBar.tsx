const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='w-[196px] h-[4px] bg-[#EDEEF2] relative mb-[44px]'>
      {/* <div
        className={`h-full bg-subblue rounded-full absolute w-${progress}%`}></div> */}
      {/* 태일윈드로 동적으로 %조절하려면  style을 줘야함 */}
      <div
        className='h-full bg-subblue rounded-full absolute '
        style={{ width: `${progress}%` }}></div>

      {/* <div className={`h-full bg-blue-500 rounded-full w-${progress}%`} /> */}

      <div className='flex text-subblue  font-medium text-[14px] leading-[20px] justify-end pt-[4px]'>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
