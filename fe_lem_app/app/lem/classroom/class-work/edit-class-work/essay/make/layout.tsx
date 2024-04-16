import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";

export default function EditClassWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <section className="grow">{children}</section>
    </>
  );
}
