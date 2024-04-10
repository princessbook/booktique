'use client';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useRef } from 'react';
import { useMessage } from './messages';

export default function InitUser({ user }: { user: User | undefined }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ user });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);

  return <></>;
}
