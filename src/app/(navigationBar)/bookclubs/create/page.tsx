'use client';

import SearchModal from '@/components/search/SearchModal';
import { BookInfo } from '@/lib/types/BookAPI';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateBookPage = () => {
  const [clubName, setClubName] = useState('');
  const [description, setDiscription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const supabase = createClient();
  const [bookInfo, setBookInfo] = useState<BookInfo | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();

  const uploadImageStorage = async (file: File) => {
    if (!file) return undefined;
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
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/bookclub/${fileName}`;
    } catch (error) {
      console.error(error);
    }
  };

  const insertBookClubDataToDB = async (storageImg: string | undefined) => {
    if (!bookInfo) return;
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

      if (error) {
        throw error;
      }
      if (data) {
        const bookclubData = JSON.stringify(data[0]);
        insertDataToMembers(JSON.parse(bookclubData).id);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const insertDataToMembers = async (clubId: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return;
    try {
      const { error } = await supabase.from('members').insert([
        {
          club_id: clubId,
          user_id: user.id,
          role: 'admin'
        }
      ]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
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
    if (isSubmit) return;
    e.preventDefault();
    if (!description || !clubName) {
      alert('빈칸을 채워주세요.');
      return;
    }
    if (!bookInfo) {
      alert('북클럽에서 읽을 책을 선택해 주세요');
      return;
    }
    if (!isSubmit) {
      setIsSubmit(true);
    }

    const storageImg = await uploadImageStorage(selectedImage!);
    await insertBookClubDataToDB(storageImg);
    router.push('/bookclubs');
    router.refresh();
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
    <section className='p-4 mb-[78px] overflow-y-auto'>
      <h1 className='text-2xl mb-4 text-center font-bold'>북클럽 만들기</h1>
      {/* 책 검색 버튼 */}
      <button
        className='mb-4 bg-[#333333] text-white px-4 py-2 rounded'
        onClick={() => setIsModalOpen(true)}>
        책 검색하기
      </button>
      {/* 책 정보 모달 */}
      <SearchModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setBookInfo={setBookInfo}
      />
      {/* 선택된 책 정보 표시 */}
      {bookInfo && (
        <div className='flex bg-gray-200 p-4 rounded-lg mb-4'>
          <div className='mr-4 flex items-center'>
            <Image
              src={bookInfo.cover}
              width={100}
              height={150}
              alt='book cover'
            />
          </div>
          <div>
            <h1 className='text-xl font-bold mb-2'>{bookInfo.title}</h1>
            <p className='text-gray-700 mb-2'>{bookInfo.author}</p>
            <p className='text-gray-700'>
              {bookInfo.categoryName.split('>')[1]}
            </p>
            <p className='text-gray-700'>{bookInfo.itemPage}p</p>
          </div>
        </div>
      )}
      {/* 폼 */}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='clubName' className='block font-bold mb-1'>
            북클럽 이름
          </label>
          <input
            id='clubName'
            className='border w-full px-4 py-2'
            type='text'
            max={30}
            value={clubName}
            onChange={handleClubNameChange}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block font-bold mb-1'>
            북클럽 소개
          </label>
          <textarea
            id='description'
            className='border w-full px-4 py-2'
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='participants' className='block font-bold mb-1'>
            모집 인원
          </label>
          <select
            id='participants'
            className='border w-full px-4 py-2'
            value={selectedParticipants}
            onChange={handleParticipantChange}>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}명
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor='image' className='block font-bold mb-1'>
            썸네일
          </label>
          <input
            id='image'
            className='border'
            type='file'
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div>
              <Image src={previewUrl} alt='preview' width={100} height={100} />
            </div>
          )}
        </div>
        <button
          type='submit'
          className={` text-white px-4 py-2 rounded ${
            isSubmit ? 'bg-gray-500 cursor-not-allowed' : 'bg-mainblue'
          }`}
          disabled={isSubmit}>
          {isSubmit ? '제출 중...' : '개설하기'}
        </button>
      </form>
    </section>
  );
};

export default CreateBookPage;
