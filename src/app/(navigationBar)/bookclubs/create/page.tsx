'use client';
import { BookInfo } from '@/lib/types/BookAPI';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import HeaderWithBack from '../HeaderWithBack';
import SearchModal from './search/SearchModal';

const CreateBookPage = () => {
  const [clubName, setClubName] = useState('');
  const [description, setDiscription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<
    null | number
  >(null);
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
    if (!selectedParticipants) {
      alert('참가자 수를 선택해 주세요.');
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
    <div>
      <HeaderWithBack title='북클럽 만들기' />
      <section className='mb-[100px] overflow-y-auto px-4'>
        {/* 책 검색 버튼 */}
        <div className='mb-8'>
          <h2 className='text-[16px] mb-4 font-bold text-fontMain'>
            책 고르기
          </h2>
          <div
            className='flex relative items-center justify-center w-full h-[292px] bg-[#EDEEF2] rounded-lg cursor-pointer'
            onClick={() => setIsModalOpen(true)}>
            <div
              className={`${
                !bookInfo && 'bookSearchBox'
              } text-center text-[12px] text-fontGrayBlue flex flex-col items-center justify-center w-[156px] h-[244px]`}>
              <div className='mb-2'>
                이 곳을 눌러 <br />
                함께 읽을 책을 <br />
                골라주세요
              </div>
              <div className='flex justify-center text-[12px] items-center w-[77px] h-[22px] bg-fontGrayBlue text-white rounded-full'>
                <IoIosSearch
                  className='flex items-center text=[#3F3E4E] justify-center'
                  size={14}
                  color='#ffffff'
                />
                책 고르기
              </div>
            </div>
            {bookInfo && (
              <div className='absolute  flex items-center'>
                <Image
                  src={bookInfo.cover}
                  width={156}
                  height={260}
                  alt='book cover'
                />
              </div>
            )}
          </div>
        </div>

        {/* 책 정보 모달 */}

        {/* 선택된 책 정보 표시 */}

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <div className='mb-8'>
            <label
              htmlFor='clubName'
              className='text-[16px] mb-4 font-bold text-fontMain'>
              북클럽 이름
            </label>
            <input
              id='clubName'
              className='border w-full px-4  mt-4 h-[48px] bg-[#EDEEF2] rounded-lg text-[14px] placeholder-fontMain placeholder-opacity-60'
              type='text'
              max={30}
              value={clubName}
              onChange={handleClubNameChange}
              placeholder='북클럽 이름을 정해주세요.'
            />
          </div>
          {/* <div className='mb-8'>
            <label
              htmlFor='clubName'
              className='block text-[16px] mb-4 font-bold text-fontMain'>
              
            </label>
            <ReactSelectBar />
          </div> */}
          <div className='mb-8'>
            <label
              htmlFor='participants'
              className='text-[16px] mb-4  font-bold text-fontMain'>
              모집 인원
            </label>
            <div className='relative'>
              <select
                id='participants'
                className={`border ${
                  !selectedParticipants
                    ? 'text-fontMain text-opacity-60'
                    : 'text-fontMain'
                } text-[14px] bg-[#EDEEF2] w-full px-4 h-[48px] mt-4 rounded-lg appearance-none pr-8`}
                value={selectedParticipants!}
                defaultValue=''
                onChange={handleParticipantChange}>
                <option value='' disabled hidden className=' '>
                  참가자 수를 선택하세요
                </option>
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}명
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none top-4'>
                <IoIosArrowDown className='text-gray-400' size={22} />
              </div>
            </div>
          </div>
          <div className='mb-8'>
            <label
              htmlFor='description'
              className='text-[16px] mb-4 font-bold text-fontMain'>
              북클럽 소개
            </label>
            <textarea
              id='description'
              className='border w-full px-4 py-4 h-[268px] mt-4 rounded-lg bg-[#EDEEF2] text-[14px] placeholder-fontMain placeholder-opacity-60'
              value={description}
              onChange={handleDescriptionChange}
              placeholder='북클럽 소개글을 작성해 주세요'
            />
          </div>

          {/* <div className='mb-8'>
            <label
              htmlFor='image'
              className='text-[16px] mb-4 font-bold text-fontMain'>
              썸네일
            </label>
            <input
              id='image'
              className='border mt-4'
              type='file'
              onChange={handleImageChange}
            />
            {previewUrl && (
              <div>
                <Image
                  src={previewUrl}
                  alt='preview'
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div> */}
          <button
            type='submit'
            className={` px-4 py-2 w-full bg-mainblue h-[56px] rounded-xl text-white flex items-center justify-center cursor-pointer ${
              isSubmit ? 'bg-gray-500 cursor-not-allowed' : 'bg-mainblue'
            }`}
            disabled={isSubmit}>
            {isSubmit ? '제출 중...' : '북클럽 만들기'}
          </button>
        </form>
        <SearchModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setBookInfo={setBookInfo}
        />
      </section>
    </div>
  );
};

export default CreateBookPage;
