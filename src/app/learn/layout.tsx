import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
