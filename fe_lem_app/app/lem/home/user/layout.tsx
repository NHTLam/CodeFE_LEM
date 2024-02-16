import Navbar from "@/components/ComponentsUserPage/Navbar";
import { Sidebar } from "@/components/ComponentsUserPage/MainSideBar";
import { Toaster } from "sonner";

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         <Toaster />
         <main className="pt-20 md:pt-20 px-4 max-w-6xl 2xl:max-w-screen-xl">
         <div className="flex gap-x-7">
            <div className="w-64 shrink-0 hidden md:block">
               <Sidebar />
            </div>
            {children}
         </div>
      </main>
      </>
   );
}