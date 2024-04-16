'use client';

import useRelativeTime from '@/hooks/Board/useRelativeTime';

const ArticleTimeStamp = ({ created_at }: { created_at: string | null }) => {
  const res = useRelativeTime(created_at as string);

  return <p className={'text-xs text-gray-400'}>{res}</p>;
};

export default ArticleTimeStamp;
