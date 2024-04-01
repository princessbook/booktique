'use client';

import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { useState } from 'react';

const CreateBookPage = () => {
  //저장할 북아이디 isbn13
  const [clubName, setClubName] = useState('');
  const [description, setDiscription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const uploadImageStorage = async (file: File) => {
    console.log('file', file);
    const fileExt = file?.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    try {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(clubName);
    console.log(description);
    console.log(selectedParticipants);
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
      <div className='flex bg-bookpurble mb-3 p-3'>
        <div className='mr-5'>
          이미지들어갈자리
          <div className=''></div>
          {/* <Image src="/" alt="img"/> */}
        </div>
        <div>
          <h1>책 제목</h1>
          <p>저자명</p>
          <p>장르</p>
          <p>페이지수</p>
        </div>
      </div>
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
              <Image src={previewUrl} alt='Preview' width='100' height='100' />
            </div>
          )}
          <button
            className='bg-mainblue'
            onClick={() => {
              if (selectedImage) {
                uploadImageStorage(selectedImage);
              }
            }}>
            파일등록
          </button>
        </div>
        <input
          type='button'
          value='개설하기'
          className='mx-auto p-3 bg-mainblue'
        />
      </form>
    </section>
  );
};

export default CreateBookPage;
