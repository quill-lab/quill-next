import MobileHeader from '@/components/molecules/MobileHeader';
import { PageHeader } from '@/components/PageHeader/PageHeader';

export default function DetailedWorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {/* PageHeader for larger screens */}
      <div className="w-full hidden sm:flex justify-center items-center bg-[#9CE1E6] px-[16px] pt-[8px]">
        <PageHeader />
      </div>

      {/* MobileHeader for smaller screens */}
      <div className="w-full block sm:hidden bg-[#9CE1E6]">
        <MobileHeader />
      </div>
      <div className="flex gap-10">{children}</div>
    </div>
  );
}
