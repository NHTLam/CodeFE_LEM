import Footer from "@/components/ComponentsLandingPage/Footer";
import Navbar from "@/components/ComponentsUserPage/Navbar";
import { Toaster } from "sonner";

export default function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Toaster />
      <main className="h-auto px-4 pt-20 md:pt-20 2xl:max-w-screen-xl">
        {children}
      </main>
    </>
  );
}
