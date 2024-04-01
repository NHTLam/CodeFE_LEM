"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

import { Skeleton } from "@/components/ui/skeleton";
import { any } from "zod";
import { Search, SendHorizontal, UsersRound } from "lucide-react";

const useFakeAuth = () => {
  const user = {
    userId: "1234567890",
    username: "John Doe",
    email: "johndoe@example.com",
  };

  return {
    userId: user.userId,
    username: user.username,
    email: user.email,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  };
};

export const ListClassWork = () => {
  const { userId } = useFakeAuth();
  if (userId == "0") {
    return redirect("/select-org");
  }

  // const filter: FilterData = {
  //   skip: 0,
  //   take: 10,
  //   isNotification: true
  // };

  // const [classEvents, setClassEvents] = useState<any>();
  // const [first, setFirst] = useState<any>(true);

  // useEffect(() => {
  //   if (first == true) {
  //     const fetchData = async () => {
  //       const data = await FetchDataClassEvent(filter);
  //       setClassEvents(data);
  //     };
  //     fetchData();
  //     setFirst(false);
  //   }
  // }, []);
  const classEvents = [
    {
      id: 1,
      classroomId: 1,
      code: "CE2",
      name: "Bài kiểm tra giữa kỳ",
      isNotification: true,
      description: "Cả lớp làm bài kiểm tra giữa kỳ",
      order: false,
      createdAt: "2024-02-26T14:22:40.267",
      endAt: "2024-02-26T07:20:22.36",
      updatedAt: "2024-02-26T14:22:40.267",
      deletedAt: null,
      comments: [
        {
          id: 1,
          classEventId: 1,
          description: "Mọi người nhớ làm bài đúng hạn",
        },
        {
          id: 2,
          classEventId: 1,
          description: "Đã hết hạn làm bài kiểm tra",
        },
      ],
      questions: [],
    },
    {
      id: 8,
      classroomId: 1,
      code: "CE4",
      name: "Bài kiểm tra cuối kỳ",
      isNotification: true,
      description: "Cả lớp làm bài kiểm tra cuối kỳ",
      order: true,
      createdAt: "2024-02-26T14:22:40.267",
      endAt: "2024-02-26T14:22:40.267",
      updatedAt: "2024-02-26T14:22:40.267",
      deletedAt: null,
      comments: [],
      questions: [],
    },
  ];
  const [post, setPost] = useState<any>(false);
  const [showComment, setShowComment] = useState<any>(false);

  return (
    <div>
      <div className="mx-50 mt-10 flex justify-end">
        <button className="w-50 rounded-full border border-slate-500 p-1 font-semibold hover:bg-slate-200">
          View my work
        </button>
        <Link href="/lem/classroom/class-work/edit-class-work/multiple-choice/make">
          <button className="ml-2 w-50 rounded-full border border-slate-500 p-1 font-semibold hover:bg-slate-200">
            Add class work
          </button>
        </Link>
      </div>
      <div className="col-span-2 m-4 flex flex-col items-center space-y-4">
        {classEvents?.map((classEvent, index) => (
          <Card
            key={index}
            className="w-3/4 rounded-lg border border-slate-500 p-2 "
          >
            <CardHeader className="flex gap-3">
              <img
                className="rounded-full border"
                width={60}
                alt="Avatar"
                src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
              />
              <div className="flex flex-col">
                <p className="text-base">User</p>
                <p className="text-xs">Time</p>
              </div>
              <div>
                <h1 className="ml-25 text-xl font-semibold">
                  {classEvent.name}
                </h1>
              </div>
            </CardHeader>
            <hr />
            <CardBody>
              <p className=" relative text-base">{classEvent.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

ListClassWork.Skeleton = function SkeletonClassEventList() {
  return (
    <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
