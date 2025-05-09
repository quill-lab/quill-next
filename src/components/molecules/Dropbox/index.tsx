'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function DropDownBox({}) {
  const router = useRouter();
  const params = useParams();
  const novelId = params?.roomId;
  const searchParams = useSearchParams();
  const sortOption = searchParams?.get('sort') ?? 'desc';
  const [isPending, startTransition] = useTransition();

  const sortOptionList: { name: string; alias: string }[] = [
    { name: 'desc', alias: '최신화부터' },
    { name: 'asc', alias: '처음부터' },
  ];

  const isValidSortOption = (inputOption: string) => {
    const isIncludeOption = sortOptionList.some(option => option.name === inputOption);
    return isIncludeOption;
  };

  const mappingOption = (inputOption: string) => {
    const findMatchedOption = sortOptionList.find(option => option.name === inputOption);
    return findMatchedOption?.alias;
  };

  return (
    <DropdownMenu>
      {isPending && <LoadingBar />}
      <DropdownMenuTrigger className="bg-[white] bg-opacity-50 rounded-[100px] border-none outline-none px-[16px] py-[8px] text-[#059eaf] text-[12px] font-[500] font-[spoqa] flex gap-[4px]">
        {isValidSortOption(sortOption || '') ? mappingOption(sortOption!) : '최신화부터'}
        <Image src={'/images/bottom-polygon.svg'} width={10} height={8} alt="show_more" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[112px] bg-white border-none flex flex-col items-center justify-center pb-[16px] pt-[12px] mt-[0px] rounded-[10px]">
        <DropdownMenuSeparator className="flex flex-col items-center justify-center py-[0px] mt-[0px]" />
        {sortOptionList.map(option => (
          <DropdownMenuItem
            className={`cursor-pointer ${
              sortOption === option.name ? 'text-[#2d2d2d]' : 'text-[#A6A6A6]'
            }`}
            onClick={() =>
              startTransition(() => {
                router.push(`/work-space/detail/${novelId}/episode?sort=${option.name}`);
              })
            }
          >
            {option.alias}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
