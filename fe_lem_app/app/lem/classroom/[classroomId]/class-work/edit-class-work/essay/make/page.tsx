"use client";
import { useState } from "react";
import { Circle, Upload } from "lucide-react";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";
import { MakeEssay } from "@/components/ComponentsClassroomPage/MakeEssay";
import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";
import { CreateClassEvent } from "@/services/class-event-service";
import { CreateQuestion } from "@/services/question-service";
import { toast } from "sonner";

const MakeEssayPage = () => {
  var classroomId = "";
  var appUserId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
    appUserId = localStorage.getItem("userId") ?? "";
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
      appUserId: Number(appUserId) == 0 ? 1 : Number(appUserId),
      questions: questionList,
    });

    window.location.href = `/lem/classroom/${classroomId}/class-work`;
    toast.success("Create question success", {
      style: {
        color: "green",
      },
    });
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
