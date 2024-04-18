import { NavClassroom } from "@/components/ComponentsClassroomPage/NavClassroom";
import Footer from "@/components/ComponentsLandingPage/Footer";
import Navbar from "@/components/ComponentsUserPage/Navbar";
import { Toaster } from "sonner";

export default function ClassroomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { classroomId: number };
}) {
  return (
    <>
      <Navbar />
      <Toaster />
      <main className="h-auto px-4 pt-20">
        <NavClassroom classroomId={params.classroomId} />
        {children}
      </main>
    </>
  );
}
