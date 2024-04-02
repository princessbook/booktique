import Button from '@/common/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Button selected={false} text='Small Button' small></Button>
      <Button text='Large Button' large></Button>
    </div>
  );
}
