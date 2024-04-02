import Button from '@/common/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <h1>꿈을펼쳐봐</h1>
      <Button selected={false} text='Small Button' small></Button>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <h1>꿈을펼쳐봐</h1>
      <Button text='Large Button' large></Button>
    </div>
  );
}
