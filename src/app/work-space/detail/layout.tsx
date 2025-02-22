export default function DetailedWorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "py-[126px] bg-cover bg-[url('/images/back-image.svg')] min-h-screen flex flex-col gap-4 items-center pb-[100px] overscroll-none"
      }
    >
      <div className="flex flex-col gap-4 items-center pb-[100px] overscroll-none">{children}</div>
    </div>
  );
}
