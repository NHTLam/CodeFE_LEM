"use client";
import { useState } from "react";
import { Circle, Upload } from "lucide-react";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";
import { MakeEssay } from "@/components/ComponentsClassroomPage/MakeEssay";
import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";
import { CreateClassEvent } from "@/services/class-event-service";
import { CreateQuestion } from "@/services/question-service";

const MakeEssayPage = () => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  function upLoadFile() {
    console.log("Upload File");
  }

  function AddAnswer() {
    console.log("Upload File");
  }

  const [questionList, setQuestionList] = useState<any[]>([]);

  const dataChildren = (childData) => {
    setQuestionList(childData);
    console.log(childData);
  };

  const actionChildren = async (childData) => {
    const data = await CreateClassEvent({
      ...childData,
      isClassWork: true,
      classroomId: Number(classroomId),
      code: "",
      appUserId: 1,
      questions: questionList,
    });

    window.location.href = `/lem/classroom/${classroomId}/class-work`;
  };

  return (
    <>
      <div className="flex w-full">
        <div className="w-1/3">
          <SidebarEditClassWork ParentCallBack={actionChildren} />
        </div>
        <MakeEssay ParentCallBack={dataChildren} />
      </div>
    </>
  );
};
export default MakeEssayPage;
