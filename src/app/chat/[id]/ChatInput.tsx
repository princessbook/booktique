'use client';
import { Imessage, useMessage } from '@/store/messages';
import { useUser } from '@/store/user';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TbSend } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { MdAddPhotoAlternate } from 'react-icons/md';

const ChatInput = () => {
  const supabase = createClient();
  const params = useParams<{ id: string }>();
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined); //이미지
  const [messageText, setMessageText] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null); //채팅방 파일첨부
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const { data: users, error } = await supabase
        .from('profiles')
        .select('photo_URL, display_name')
        .eq('id', data?.user?.id!);

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (users && users.length > 0) {
        setPhotoURL(users[0].photo_URL!); // photo_URL 값을 상태로 설정
        setDisplayName(users[0].display_name!);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadChatFileStorage = async (file: File) => {
    if (!file) return undefined;
    const fileExt = file?.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    try {
      const supabase = createClient();
      const { error } = await supabase.storage
        .from('images')
        .upload(`bookclubChat/${fileName}`, file);

      if (error) {
        throw new Error('이미지 업로드 실패', error);
      }
      // console.log(fileName);
      return `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/bookclubChat/${fileName}`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (messageText.trim() || selectedFile) {
      // 이미지 업로드 및 파일 이름 설정
      const storageImg = await uploadChatFileStorage(selectedFile!);

      const newMessage = {
        id: uuidv4(),
        text: messageText,
        send_from: userId,
        is_edit: false,
        club_id: params?.id,
        created_at: new Date().toISOString(),
        send_photo_URL: storageImg,
        profiles: {
          id: data.user?.id,
          photo_URL: photoURL || '/defaultImage.svg',
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.display_name,
          email: user?.user_metadata.email,
          introduction: user?.user_metadata.introduction
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
          thumbnail: user?.user_metadata.thumbnail,
          weekday: user?.user_metadata.thumbnail,
          last_read: user?.user_metadata.thumbnail
        }
      };
      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);
      // 메시지 전송 후 상태 초기화
      setMessageText('');
      setSelectedFile(null);
      setImagePreview(undefined);
      const { error } = await supabase.from('messages').insert([
        {
          text: messageText,
          club_id: params.id,
          send_from: userId ?? '',
          send_photo_URL: storageImg
        }
      ]);
      // 콘솔에 메시지 확인
      // console.log('전송된 메시지:', newMessage);
    } else {
      alert('빈값입니다');
    }
  };
  const handleCancelPhoto = () => {
    setSelectedFile(null);
    setImagePreview(undefined);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}>
      <div className='relative p-1 px-3 flex items-center'>
        <div>
          <label className=' cursor-pointer' htmlFor='file-upload'>
            <MdAddPhotoAlternate size={25} />
          </label>
          <input
            id='file-upload'
            className='hidden'
            type='file'
            accept='.gif, .jpg, .png, .jpeg'
            onChange={handleFileChange}
          />
        </div>
        {imagePreview && (
          <div className='absolute w-2/3 bg-slate-500 bg-opacity-75 top-[-200px] left-2 h-48'>
            <img
              src={imagePreview}
              alt='Image Preview'
              className='h-full mx-auto'
            />
            <div
              onClick={handleCancelPhoto}
              className='absolute bg-white right-0 top-0 rounded-full border-black border-[1px] cursor-pointer'>
              <IoMdClose size={25} />
            </div>
          </div>
        )}
        <textarea
          value={messageText}
          className='w-5/6 h-[44px] rounded-xl pl-3 py-[10px] '
          placeholder={`${displayName}(으)로 메세지 작성`}
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
          className='absolute  right-0 w-[42px] h-[44px] rounded-r-xl '>
          <TbSend size={25} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
