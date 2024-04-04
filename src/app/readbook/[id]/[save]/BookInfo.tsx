import { Tables } from '@/lib/types/supabase';
import React from 'react';

const BookInfo = ({ clubData }: { clubData: Tables<'clubs'> }) => {
  return <div>{clubData.book_title}</div>;
};

export default BookInfo;
