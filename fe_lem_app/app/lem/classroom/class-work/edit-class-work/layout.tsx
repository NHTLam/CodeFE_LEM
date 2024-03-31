import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";

export default function EditClassWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex gap-x-7">
        <div className="border-r">
          <SidebarEditClassWork />
        </div>
        {children}
      </div>
    </>
  );
}
