"use client";
import { InforGroups } from "@/components/ComponentsClassroomPage/InforGroups";
import { NavClassroom } from "@/components/ComponentsClassroomPage/NavClassroom";
import { ListBox } from "@/components/ListBox";
import { ListByClassroom } from "@/services/board-service";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

const Groups = () => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }
  const [boards, setBoards] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await ListByClassroom(Number(classroomId));
      setBoards(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <InforGroups />
      <hr className="mx-25 mt-5" />
      <div className="mx-25 mt-5">
        <div className="flex items-center text-lg font-semibold text-neutral-700">
          <Users className="mr-3" /> Class groups
        </div>
        <ListBox
          classroomIdForBoard={Number(classroomId)}
          isRecently={false}
          dataBoards={boards}
          dataClasses={null}
        />
      </div>
    </>
  );
};

export default Groups;
