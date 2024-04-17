import { NavClassroom } from "@/components/ComponentsClassroomPage/NavClassroom";
import Footer from "@/components/ComponentsLandingPage/Footer";
import Navbar from "@/components/ComponentsUserPage/Navbar";
import { NoneUI } from "@/components/ComponentsClassroomPage/NoneUi";
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
      <Navbar classroomId={params.classroomId} />
      <Toaster />
      <main className="h-auto px-4 pt-20">
        <NoneUI classroomId={params.classroomId} />
        {children}
      </main>
    </>
  );
}
