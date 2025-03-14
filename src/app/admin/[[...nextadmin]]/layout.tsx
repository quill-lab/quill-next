import "../../../styles.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#2D2D2D]">
      {children}
    </div>
  );
} 