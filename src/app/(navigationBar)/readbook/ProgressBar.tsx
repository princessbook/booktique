const ProgressBar = ({
  progress,
  backgroundColor
}: {
  progress: number;
  backgroundColor: string;
}) => {
  return (
    <div className='w-[196px] h-[4px] bg-[#EDEEF2] relative mb-[44px]'>
      {/* <div
        className={`h-full bg-subblue rounded-full absolute w-${progress}%`}></div> */}
      {/* 태일윈드로 동적으로 %조절하려면  style을 줘야함 */}
      <div
        className='h-full bg-subblue rounded-full absolute transition-width duration-1000 ease-out'
        style={{ width: `${progress}%` }}></div>

      {/* <div className={`h-full bg-blue-500 rounded-full w-${progress}%`} /> */}
      <div
        className={`w-full h-full rounded-full`}
        style={{ backgroundColor: backgroundColor }}></div>
      <div className='text-end text-subblue'> {progress}%</div>
    </div>
  );
};

export default ProgressBar;
