import MobileHeader from '@/components/molecules/MobileHeader';
import { PageHeader } from '@/components/PageHeader/PageHeader';

export default function DetailedWorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'pt-[8px] sm:pb-[72px] px-[16px] w-full bg-cover bg-[#9DE1E6] min-h-screen flex flex-col gap-4 items-center justify-start sm:justify-center overscroll-none'
      }
    >
      {/* PageHeader for larger screens */}
      <div className="w-full hidden sm:flex justify-center items-center">
        <PageHeader />
      </div>

      {/* MobileHeader for smaller screens */}
      <div className="w-full block sm:hidden">
        <MobileHeader />
      </div>

      {/* Main content area */}
      <div className="flex gap-10 w-full justify-center">{children}</div>
    </div>
  );
}
