'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function DropDownBox({}) {
  const router = useRouter();
  const params = useParams();
  const novelId = params?.roomId;
  const searchParams = useSearchParams();
  const sortOption = searchParams?.get('sort');

  const sortOptionList: { name: string; alias: string }[] = [
    { name: 'Profile', alias: '프로필' },
    { name: 'Billing', alias: '요금제' },
    { name: 'Team', alias: '팀' },
    { name: 'Subscription', alias: '구독' },
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
      <DropdownMenuTrigger className="bg-[white] bg-opacity-50 rounded-[100px] border-none outline-none px-[16px] py-[8px] text-[#059eaf] text-[12px] font-[500] font-[spoqa] flex gap-[4px]">
        {isValidSortOption(sortOption || '') ? mappingOption(sortOption!) : '처음부터'}
        <Image src={'/images/bottom-polygon.svg'} width={10} height={8} alt="show_more" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border-none flex flex-col items-center justify-center px-[0] rounded-[10px]">
        <DropdownMenuSeparator />
        {sortOptionList.map(option => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/work-space/detail/${novelId}/episode?sort=${option.name}`)}
          >
            {option.alias}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
