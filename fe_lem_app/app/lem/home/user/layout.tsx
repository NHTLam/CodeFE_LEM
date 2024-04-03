import Navbar from "@/components/ComponentsUserPage/Navbar";
import { Sidebar } from "@/components/ComponentsUserPage/MainSideBar";
import { Toaster } from "sonner";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="h-screen px-4 pt-20 md:pt-20 2xl:max-w-screen-xl">
        <div className="flex gap-x-7">
          <div className="hidden w-64 shrink-0 md:block">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
