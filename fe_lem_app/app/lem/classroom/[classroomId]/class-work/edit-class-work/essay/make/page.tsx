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

  const DefautAnswer = {
    name: "A",
    answer: "Answer 1",
  };

  function upLoadFile() {
    console.log("Upload File");
  }

  function AddAnswer() {
    console.log("Upload File");
  }

  const [instruction, setInstruction] = useState("");
  const dataChildren = (childData) => {
    setInstruction(childData);
  };

  const actionChildren = async (childData) => {
    const data = await CreateClassEvent({
      ...childData,
      isClassWork: true,
      classroomId: classroomId,
      code: "",
    });

    if ("id" in data) {
      CreateQuestion({
        classEventId: data.id,
        instruction: instruction,
        correctAnswer: "",
        name: "",
      });
    } else {
      // Xử lý trường hợp có lỗi từ server
      console.error("Error creating class event:", data.error);
    }
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
