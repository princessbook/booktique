'use client';
import { BookInfo } from '@/lib/types/BookAPI';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DOMAttributes, useState } from 'react';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import HeaderWithBack from '../../../../components/common/HeaderWithBack';
import SearchModal from './search/SearchModal';
import { CiCamera } from 'react-icons/ci';
import { Slider } from '@nextui-org/react';
import ToastUi from '@/common/ToastUi';
import LoadingPopUp from '@/components/common/LoadingPopUp';
const CreateBookPage = () => {
  const [clubName, setClubName] = useState('');
  const [description, setDiscription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<
    null | number
  >(1);
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
            book_page: bookInfo.itemPage,
            weekday: selectedDays.join(', ')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmit) return;
    e.preventDefault();
    if (!bookInfo) {
      alert('북클럽에서 읽을 책을 선택해 주세요');
      return;
    }
    if (!clubName) {
      alert('북클럽 이름을 입력해 주세요.');
      return;
    }
    if (selectedDays.length === 0) {
      alert('요일을 선택해 주세요');
      return;
    }
    if (!selectedParticipants) {
      alert('참가자 수를 선택해 주세요.');
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

  const toastStyle = {
    width: '343px',
    height: '50px',
    // 헤더 48이라 임시로 해놓음
    left: '50%', // 화면 중앙
    transform: 'translateX(-50%)',
    fontSize: '8px'
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleItemClick = (day: string) => {
    toggleDay(day);
  };

  return (
    <div>
      <HeaderWithBack title='북클럽 만들기' />
      <section className='mb-[100px] overflow-y-auto px-4'>
        {/* 책 검색 버튼 */}
        <div className='mb-8 '>
          <h2 className='text-[16px] mb-4 font-bold text-fontMain'>
            책 고르기
            <span className=' text-errorRed'> *</span>
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
              북클럽 이름 <span className=' text-errorRed'>*</span>
            </label>
            <input
              id='clubName'
              className='border w-full px-4  mt-4 h-[48px] bg-[#EDEEF2] rounded-lg text-[14px] placeholder-fontMain placeholder-opacity-60'
              type='text'
              maxLength={30}
              minLength={2}
              value={clubName}
              onChange={handleClubNameChange}
              placeholder='북클럽 이름을 정해주세요(최소 2자 이상)'
            />
          </div>
          <div className='mb-8'>
            <div className='block text-[16px] mb-4 font-bold text-fontMain'>
              북클럽 요일<span className=' text-errorRed'>*</span>
            </div>
            <div className='relative'>
              <div className='flex items-center border w-full px-4  mt-4 h-[48px] bg-[#EDEEF2] rounded-lg text-[14px] placeholder-fontMain placeholder-opacity-60'>
                <div
                  onClick={toggleOpen}
                  className='flex flex-wrap items-center cursor-pointer'>
                  {selectedDays.length === 0 && (
                    <span className=' text-fontMain text-opacity-60'>
                      북클럽 요일을 정해주세요(중복선택 가능)
                    </span>
                  )}
                  {selectedDays
                    .sort((a, b) => {
                      const daysOfWeek = [
                        '월',
                        '화',
                        '수',
                        '목',
                        '금',
                        '토',
                        '일'
                      ];
                      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
                    })
                    .map((day, i) => (
                      <span
                        key={day}
                        className='inline-block rounded-full  text-sm font-semibold text-fontMain mr-2'>
                        {day}
                        {selectedDays.length - 1 !== i && ','}
                      </span>
                    ))}
                  <span className='absolute cursor-pointer right-2'>
                    <IoIosArrowDown className='text-gray-400' size={22} />
                  </span>
                </div>
                {isOpen && (
                  <ul className='absolute top-10 z-10 left-0 w-full mt-2 bg-white border rounded-lg shadow-md'>
                    {['월', '화', '수', '목', '금', '토', '일'].map((val) => (
                      <li
                        key={val}
                        className={`px-4 py-2 cursor-pointer ${
                          selectedDays.includes(val) ? ' bg-grayBgLight' : ''
                        }`}
                        onClick={() => handleItemClick(val)}>
                        {val}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* <ReactSelectBa/> */}
          </div>
          <div className='mb-10'>
            <div className='text-[16px] mb-4 font-bold text-fontMain'>
              모집 인원<span className=' text-errorRed '> *</span>
            </div>
            <div className='relative mt-4'>
              <Slider
                // label='Temperature'
                // label='slider'
                aria-label='slider'
                step={1}
                maxValue={10}
                minValue={1}
                defaultValue={1}
                showTooltip={true}
                showOutline={true}
                showSteps={true}
                className='max-w-md h-8'
                value={selectedParticipants!} // 현재 슬라이더 값 설정
                onChange={(newValue: number | number[]) =>
                  setSelectedParticipants(newValue as number)
                }
                marks={[
                  {
                    value: 1,
                    label: '1'
                  },
                  {
                    value: 5,
                    label: '5'
                  },
                  {
                    value: 10,
                    label: '10'
                  }
                ]}
                tooltipProps={{
                  offset: 0,
                  placement: 'bottom',
                  classNames: {
                    base: [
                      // arrow color
                      ''
                    ],
                    content: ['', 'text-[#3F3E4E] text-[14px]  bg-white ']
                  }
                }}
                classNames={{
                  base: 'max-w-md ',
                  filler: 'bg-[#DBE3EB] rounded-lg ',
                  labelWrapper: 'mb-2',
                  step: `w-[2px] h-[28px] bg-grayBg data-[in-range=true]:bg-[#DBE3EB]`,
                  track: 'bg-grayBg h-4',
                  mark: 'mt-5 text-fontGrayBlue z-0 opacity-100 text-[12px]',
                  label:
                    'font-medium mt-3 text-default-700 text-medium text-fontGrayBlue',
                  value:
                    'font-medium mt-3 text-default-500 text-small text-fontGrayBlue'
                }}
                renderThumb={(props: DOMAttributes<HTMLDivElement>) => (
                  <div {...props} className='group relative top-2'>
                    {/* thumb 내부에 value 값을 표시하는 요소를 추가합니다. */}

                    <div className='group p-1 top-10 bg-[#DBE3EB] border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing'>
                      <span className='transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80' />
                    </div>
                  </div>
                )}
              />
              {/* <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none top-4'>
                <IoIosArrowDown className='text-gray-400' size={22} />
              </div> */}
            </div>
          </div>
          <div className='mb-8'>
            <label
              htmlFor='clubName'
              className='text-[16px] mb-4 font-bold text-fontMain'>
              책 읽기 목표 시간
            </label>
            <div className='border w-full px-4  mt-4 h-[48px] bg-[#EDEEF2] rounded-lg text-[14px] text-fontMain text-opacity-60 flex items-center'>
              1시간 (책 읽기 목표 시간은 1시간으로 고정입니다)
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

          <div className='mb-8'>
            <label
              htmlFor='image'
              className='text-[16px] mb-4 font-bold text-fontMain'>
              채팅방 배경화면
            </label>
            <div className=' relative border mt-4 w-[100px] rounded-lg bg-grayBg h-[140px] flex items-center justify-center cursor-pointer flex-col'>
              <input
                id='image'
                className='absolute inset-0 opacity-0 w-full h-full cursor-pointer' // input을 숨깁니다.
                type='file'
                onChange={handleImageChange}
              />
              {previewUrl ? ( // 미리보기 이미지가 있을 때
                <Image
                  src={previewUrl}
                  alt='미리보기'
                  width={100}
                  height={140}
                  className='object-cover h-full' // 이미지를 부모 요소에 맞춰서 자릅니다.
                />
              ) : (
                // 미리보기 이미지가 없을 때
                <>
                  <CiCamera size={24} className=' text-fontGray mb-2' />
                  <div className='text-center text-sm text-fontGray text-[14px]'>
                    이미지를
                    <br />
                    선택해 주세요
                  </div>
                </>
              )}
            </div>
          </div>
          <button
            aria-label='Close modal'
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
        {isSubmit && (
          <ToastUi
            message='북클럽을 만들었습니다'
            onClose={() => {}}
            isSuccess={true}
            duration={100}
            style={toastStyle}
          />
        )}
        {isSubmit && <LoadingPopUp />}
      </section>
    </div>
  );
};

export default CreateBookPage;
