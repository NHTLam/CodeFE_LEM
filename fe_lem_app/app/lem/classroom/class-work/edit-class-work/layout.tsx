import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";

export default function EditClassWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex gap-x-7">
        <div className="hidden w-64 shrink-0 md:block">
          <SidebarEditClassWork />
        </div>
        {children}
      </div>
    </>
  );
}
