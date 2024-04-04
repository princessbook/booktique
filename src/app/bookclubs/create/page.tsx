'use client';

import SearchModal from '@/components/search/SearchModal';
import { BookInfo } from '@/lib/types/BookAPI';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CreateBookPage = () => {
  const [clubName, setClubName] = useState('');
  const [description, setDiscription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const supabase = createClient();
  const [bookInfo, setBookInfo] = useState<BookInfo | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const uploadImageStorage = async (file: File) => {
    const fileExt = file?.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    try {
      const supabase = createClient();
      const { error } = await supabase.storage
        .from('images')
        .upload(`bookclub/${fileName}`, file);

      if (error) {
        throw new Error('이미지 업로드 실패', error);
      }
      return `${process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY!}/storage/v1/object/public/images/bookclub/${fileName}`;
    } catch (error) {
      console.log(error);
    }
  };

  const insertBookClubDataToDB = async (storageImg: string | undefined) => {
    if (!bookInfo) {
      alert('북클럽에서 읽을 책을 선택해 주세요');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('clubs')
        .insert([
          {
            created_at: new Date().toISOString(),
            name: clubName,
            description: description,
            max_member_count: selectedParticipants,
            archive: false,
            thumbnail: storageImg,
            book_id: bookInfo.isbn13,
            book_title: bookInfo.title,
            book_author: bookInfo.author,
            book_category: bookInfo.categoryName.split('>')[1],
            book_cover: bookInfo.cover,
            book_page: bookInfo.itemPage
          }
        ])
        .select();

      console.log('성공적으로 업로드되었음');
      if (error) {
        throw error;
      }
      if (data) {
        const bookclubData = JSON.stringify(data[0]);
        console.log('bookclubdata id: ' + JSON.parse(bookclubData).id);
        insertDataToMembers(JSON.parse(bookclubData).id);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const insertDataToMembers = async (clubId: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log('user', user);
    if (!user) return;
    try {
      const { error } = await supabase.from('members').insert([
        {
          club_id: clubId,
          user_id: user.id,
          role: 'admin'
        }
      ]);
      console.log('클럽아이디와 유저아이디가 멤버데이터에 삽입되었음');
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClubNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDiscription(e.target.value);
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(e.target.value, 10);
    setSelectedParticipants(selected);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !clubName) {
      alert('빈칸을 채워주세요.');
    }
    const storageImg = await uploadImageStorage(selectedImage!);
    await insertBookClubDataToDB(storageImg);
    router.push('/bookclubs');
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files?.[0];
      setSelectedImage(selectedFile);
      if (selectedFile) {
        // FileReader를 사용하여 이미지 파일의 URL을 읽어와서 미리보기를 표시
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  return (
    <section>
      <h1 className=' text-center'>북클럽 만들기</h1>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}>
        책검색
      </button>
      <SearchModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setBookInfo={setBookInfo}
      />
      {bookInfo && (
        <div className='flex bg-gray-300 mb-3 p-3'>
          <div className='mr-5'>
            <div className=''></div>
            <Image src={bookInfo.cover} width={200} height={300} alt='img' />
          </div>
          <div>
            <h1>{bookInfo.title}</h1>
            <p>{bookInfo.author}</p>
            <p>{bookInfo.categoryName.split('>')[1]}</p>
            <p>{bookInfo.itemPage}p</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='p-3'>
          <label className='mr-3'>북클럽 이름</label>
          <input
            className='border'
            type='text'
            value={clubName}
            onChange={handleClubNameChange}
          />
        </div>
        <div className='p-3 flex mb-5'>
          <label className='mr-3'>북클럽 소개</label>
          <textarea
            className='border'
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className='p-3'>
          <label>모집인원</label>
          <select
            value={selectedParticipants}
            onChange={handleParticipantChange}>
            <option value=''>선택하세요</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}명
              </option>
            ))}
          </select>
        </div>
        <div className='p-3'>
          <label>썸네일</label>
          <input className='border' type='file' onChange={handleImageChange} />
          {previewUrl && (
            <div>
              <Image src={previewUrl} alt='preview' width='100' height='100' />
            </div>
          )}
        </div>
        <input
          type='submit'
          value='개설하기'
          className='mx-auto p-3 bg-mainblue'
        />
      </form>
    </section>
  );
};

export default CreateBookPage;
