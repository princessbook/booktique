const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='flex w-full h-4 mt-4'>
      <div
        className='h-full bg-blue-500 rounded-full'
        style={{ width: `${progress}%` }}>
        {' '}
        {progress}%
      </div>
      <div className=' w-full h-full bg-gray-300 rounded-full'></div>
    </div>
  );
};

export default ProgressBar;
