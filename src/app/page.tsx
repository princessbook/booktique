import Button from '@/common/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <h1>Homepage</h1>
      <Button selected={false} text='dd' />
      <Button
        text='Button Text'
        customStyle='w-[343px] bg-[#E9FF8F] text-black rounded-lg'></Button>
    </div>
  );
}
