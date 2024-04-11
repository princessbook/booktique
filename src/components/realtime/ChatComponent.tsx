// 'use client';
// import React, { useEffect, useState } from 'react';
// import ChatInput from './ChatInput';
// import ListMessages from './ListMessages';
// import { createClient } from '@/utils/supabase/client';
// import InitMessages from '@/store/InitMessages';
// import { Tables } from '@/lib/types/supabase';
// type Messages = Tables<'messages'>;

// const ChatComponent = ({ clubId }: { clubId: string }) => {
//   const [messages, setMessages] = useState<Messages[] | null>(null);
//   useEffect(() => {
//     const fetchChatMessage = async () => {
//       const supabase = createClient();
//       const { data } = await supabase.from('messages').select('*,clubs(*)');
//       console.log('--------------------', data);
//       setMessages(data);
//     };
//     fetchChatMessage();
//   }, []);
//   return (
//     <div>
//       fdf
//       <ChatInput clubId={clubId} />
//       <ListMessages />
//       <InitMessages messages={messages} />
//     </div>
//   );
// };

// export default ChatComponent;
