'use client';
import { Imessage, useMessage } from '@/store/messages';
import { useUser } from '@/store/user';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TbSend } from 'react-icons/tb';
const ChatInput = () => {
  const supabase = createClient();
  const params = useParams<{ id: string }>();
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
  const [messageText, setMessageText] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const { data: users, error } = await supabase
        .from('profiles')
        .select('photo_URL')
        .eq('id', data?.user?.id!);

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (users && users.length > 0) {
        setPhotoURL(users[0].photo_URL!); // photo_URL 값을 상태로 설정
      }
    };

    fetchUserData();
  }, []);
  const handleSendMessage = async () => {
    const { data } = await supabase.auth.getUser();
    await supabase.from('profiles').select('*').eq('id', data?.user?.id!);
    const userId = data.user?.id;
    if (messageText.trim()) {
      const newMessage = {
        id: uuidv4(),
        text: messageText,
        send_from: userId,
        is_edit: false,
        club_id: params?.id,
        created_at: new Date().toISOString(),
        profiles: {
          id: data.user?.id,
          photo_URL: photoURL || '/booktique.png',
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.display_name,
          email: user?.user_metadata.email,
          interests: user?.user_metadata.interests,
          introduction: user?.user_metadata.introduction,
          most_favorite_book: user?.user_metadata.most_favorite_book
        },
        clubs: {
          id: user?.user_metadata.id,
          archive: user?.user_metadata.archive,
          book_author: user?.user_metadata.book_author,
          book_category: user?.user_metadata.book_category,
          book_cover: user?.user_metadata.book_cover,
          book_id: user?.user_metadata.book_id,
          book_page: user?.user_metadata.book_page,
          book_title: user?.user_metadata.book_title,
          created_at: new Date().toISOString(),
          description: user?.user_metadata.description,
          max_member_count: user?.user_metadata.max_member_count,
          name: user?.user_metadata.name,
          thumbnail: user?.user_metadata.thumbnail
        }
      };
      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);
      console.log(newMessage);
      // supabase 불러오기
      const { error } = await supabase
        .from('messages')
        .insert([
          { text: messageText, club_id: params.id, send_from: userId ?? '' }
        ]);
      if (error) {
        console.log(error);
      }
      setMessageText('');
    } else {
      alert('빈값입니다');
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}>
      <div className='relative p-1 px-3 bg-[#c6edff]'>
        <input
          value={messageText}
          className='w-full rounded-xl pl-3 py-[4px]'
          placeholder='send message'
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          type='submit'
          className='absolute  right-3 w-[42px] h-[32px] rounded-r-xl '>
          <TbSend size={25} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
