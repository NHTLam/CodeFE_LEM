import Navbar from "@/components/ComponentsUserPage/Navbar";
import { Toaster } from "sonner";

export default function ClassroomLayout({ children, }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         <Toaster />
         <main className="h-screen pt-20 md:pt-20 px-4 2xl:max-w-screen-xl">
            {children}
         </main>
      </>
   );
}