import { PageHeader } from '@/components/PageHeader/PageHeader';

export default function DetailedWorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'pt-[8px] pb-[72px] px-[124px] w-full bg-cover bg-[#9DE1E6] min-h-screen flex flex-col gap-4 items-center overscroll-none'
      }
    >
      <PageHeader />
      <div className="flex gap-10 w-full">{children}</div>
    </div>
  );
}
