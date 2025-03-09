import { PageHeader } from '@/components/PageHeader/PageHeader';

export default function DetailedWorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#9CE1E6] px-[124px]">
        <PageHeader />
      </div>
      <div className="flex gap-10">{children}</div>
    </>
  );
}
