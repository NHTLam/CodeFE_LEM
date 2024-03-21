import { InforGroups } from "@/components/ComponentsClassroomPage/InforGroups";
import { NavClassroom } from "@/components/ComponentsClassroomPage/NavClassroom";
import { ListBox } from "@/components/ListBox";
import { Users } from "lucide-react";

const Groups = () => {
  return (
    <>
      <NavClassroom />
      <InforGroups />
      <hr className="mx-25 mt-5" />
      <div className="mx-25 mt-5">
        <div className="flex items-center text-lg font-semibold text-neutral-700">
          <Users className="mr-3" /> My classes
        </div>
        <ListBox isRecently={false} dataBoards={null} dataClasses={null} />
      </div>
    </>
  );
};

export default Groups;
