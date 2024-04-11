'use client';
import { createClient } from '@/utils/supabase/client';
import React from 'react';

const ClubPresence = () => {
  const supabase = createClient();
  const roomOne = supabase.channel('room_01');

  roomOne
    .on('presence', { event: 'sync' }, () => {
      const newState = roomOne.presenceState();
      console.log('sync', newState);
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('join', key, newPresences);
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('leave', key, leftPresences);
    })
    .subscribe();

  return <div>ClubPresence</div>;
};

export default ClubPresence;
