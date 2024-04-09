const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='w-[196px] h-[4px] mt-4 j mx-auto relative'>
      <div
        className='w-full h-full bg-subblue rounded-full absolute'
        style={{ width: `${progress}%` }}></div>
      {/* <div className={`h-full bg-blue-500 rounded-full w-${progress}%`} /> */}
      <div className='w-full h-full bg-[#EDEEF2] rounded-full'></div>
      <div className='text-end text-subblue'> {progress}%</div>
    </div>
  );
};

export default ProgressBar;
