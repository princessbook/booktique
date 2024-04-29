'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tables } from '@/lib/types/supabase';
import { fetchClubs } from '@/action/fetch-clubs';
import ClubsCard from '../../../components/common/ClubsCard';
import { Spinner } from '@/components/common/Spinner';
import { createClient } from '@/utils/supabase/client';

export function LoadMore({}: {}) {
  const [clubs, setClubs] = useState<Tables<'clubs'>[]>([]);
  const [offset, setOffset] = useState(1);
  const { ref, inView } = useInView();
  const [isScroll, setIsScroll] = useState(true);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreClubs = async () => {
    const supabase = createClient();
    const { data: clubs } = await supabase.from('clubs').select('*');
    if (clubs && clubs.length < offset * 10) {
      setIsScroll(false);
      return;
    }
    await delay(100);
    setOffset((prev) => prev + 1);
    const newProducts = (await fetchClubs(offset)) ?? [];
    setClubs((prevProducts: Tables<'clubs'>[]) => [
      ...prevProducts,
      ...newProducts
    ]);
  };

  useEffect(() => {
    if (inView) {
      loadMoreClubs();
    }
  }, [inView]);

  return (
    <>
      <div>
        <ClubsCard clubs={clubs} />
      </div>
      <div
        className='flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3'
        ref={ref}>
        {isScroll && <Spinner />}
      </div>
    </>
  );
}
