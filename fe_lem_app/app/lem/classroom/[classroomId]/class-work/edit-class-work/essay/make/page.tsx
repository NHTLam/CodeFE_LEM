"use client";
import { useState } from "react";
import { MakeEssay } from "@/components/ComponentsClassroomPage/MakeEssay";
import { SidebarEditClassWork } from "@/components/ComponentsClassroomPage/SidebarEditClassWork";
import { CreateClassEvent } from "@/services/class-event-service";
import { toast } from "sonner";
import { UpdateQuestion } from "@/services/question-service";

const MakeEssayPage = () => {
  var classroomId = "";
  var appUserId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
    appUserId = localStorage.getItem("userId") ?? "";
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
    const questions = data?.questions;
    if (questions !== null && questions !== undefined) {
      var question = data!.questions![0];
      question.attachments = questionList[0].attachments;
      const newQuestion = await UpdateQuestion(question, classroomId);
    }
    setTimeout(() => {
      window.location.href = `/lem/classroom/${classroomId}/class-work`;
    }, 1000);
    toast.success("Create classwork success", {
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
