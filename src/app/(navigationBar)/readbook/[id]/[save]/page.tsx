import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from 'react';
import SaveBookInfo from './SaveBookInfo';
import SaveCard from './SaveCard';
import { redirect } from 'next/navigation';
import Loading from '../../../../../components/common/Loading';

const SavePage = async ({ params: { id } }: { params: { id: string } }) => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect('/login');
  }
  const { data: club_clubActivities } = await supabase
    .from('clubs')
    .select('*,club_activities(*)')
    .eq('id', id)
    .single();

  return (
    <Suspense fallback={<Loading />}>
      <div className='bg-white h-full'>
        <SaveBookInfo
          clubData={club_clubActivities}
          clubId={id}
          userId={user?.id}
        />
        <SaveCard
          clubData={club_clubActivities}
          clubId={id}
          userId={user?.id}
        />
      </div>
    </Suspense>
  );
};

export default SavePage;
