import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Clubs = Tables<'clubs'>;
const Board = ({ club }: { club: Clubs }) => {
  console.log(club.id);
  return <div>Board</div>;
};

export default Board;
