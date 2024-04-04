import React from 'react';
import ProgressBar from './ProgressBar';
import Members from './Members';
const HomeTab = ({ clubId }: { clubId: string | null }) => {
  console.log(clubId);

  return (
    <div>
      <div className='bg-[#EEEFF3] m-4 p-6 rounded-xl'>
        <ProgressBar clubId={clubId} />
      </div>
      <div>
        <Members clubId={clubId} />
      </div>
    </div>
  );
};

export default HomeTab;
