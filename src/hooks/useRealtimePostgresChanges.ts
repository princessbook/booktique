'use client';
// useRealtimePostgresChanges.ts
import { useEffect } from 'react';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
// import { Tables } from '@/lib/types/supabase';

const useRealtimePostgresChanges = (
  table: string,
  filter: string,
  callback: (
    payload: RealtimePostgresInsertPayload<{ [key: string]: string }>
  ) => void
) => {
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel('dy')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table,
          filter
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, table, filter, callback]);
};

export default useRealtimePostgresChanges;
