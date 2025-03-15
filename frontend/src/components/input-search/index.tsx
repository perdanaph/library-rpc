import { Input } from '@/components/ui/input';
import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

export default function Search() {
  return (
    <div className='flex w-full max-w-sm items-center border border-gray-300 rounded-lg pl-2.5 py-0'>
      <SearchIcon className='h-4 w-4 mr-2.5' />
      <Input
        type='search'
        placeholder='Search...'
        className='w-full border-0'
      />
    </div>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle
        cx='11'
        cy='11'
        r='8'
      />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
