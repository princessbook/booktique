'use client';

import useRelativeTime from '@/hooks/Board/useRelativeTime';

const ArticleTimeStamp = ({ created_at }: { created_at: string }) => {
  const res = useRelativeTime(created_at);

  return <p className={'text-xs text-gray-400'}>{res}</p>;
};

export default ArticleTimeStamp;
