import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";

export default function EditClassWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full">
        <div className="w-1/3">
          <SidebarEditClassWork ParentCallBack={undefined} />
        </div>
        <section className="grow">{children}</section>
      </div>
    </>
  );
}
