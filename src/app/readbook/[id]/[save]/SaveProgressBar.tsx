const SaveProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='w-[343px] bg-[#EDEEF2] px-[24.5px] py-[32px] mt-[16px] mx-auto rounded-[10px]'>
      <div className='w-[294px] h-[6px] mx-auto relative rounded-[10px] '>
        <div
          className='w-full h-full bg-blue-500 rounded-full absolute'
          style={{ width: `${progress}%` }}></div>
        {/* <div className={`h-full bg-blue-500 rounded-full w-${progress}%`} /> */}
        <div className='w-full h-full bg-gray-300 rounded-full'></div>
        <div className='text-end text-subblue text-[14px] mt-1'>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default SaveProgressBar;
