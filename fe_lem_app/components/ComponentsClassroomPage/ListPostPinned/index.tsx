"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

import { Skeleton } from "@/components/ui/skeleton";

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

export const ListPostPinned = () => {
  const { userId } = useFakeAuth();
  if (userId == '0') {
    return redirect("/select-org");
  }

  // const filter: FilterData = {
  //   skip: 0,
  //   take: 10,
  //   pinned: true,
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

  // console.log(classEvents);

  const classEvents = [
    {
      "id": 8,
      "classroomId": 1,
      "code": "CE4",
      "name": "Thông báo điểm",
      "isNotification": false,
      "description": "Thông báo điểm kiểm tra giữa kỳ",
      "order": true,
      "createdAt": "2024-02-26T14:22:40.267",
      "endAt": "2024-02-26T14:22:40.267",
      "updatedAt": "2024-02-26T14:22:40.267",
      "deletedAt": null,
      "comments": [],
      "questions": []
    },
    {
      "id": 10,
      "classroomId": 1,
      "code": "CE5",
      "name": "Các sinh viên chú ý",
      "isNotification": false,
      "description": "Các bạn sinh viên chú ý hoàn thành bài tập đúng hạn",
      "order": true,
      "createdAt": "2024-02-26T14:22:40.267",
      "endAt": "2024-02-26T14:22:40.267",
      "updatedAt": "2024-02-26T14:22:40.267",
      "deletedAt": null,
      "comments": [],
      "questions": []
    }
  ]

  return (
    <div className="flex-1 flex-col rounded-lg border-2 border-cyan-600 m-4 w-96">
      {classEvents?.map((classEvent, index) => (
        <Card key={index} className=" p-4">
          <CardHeader className="flex gap-3">
            <img className="border rounded-full"
              width={50}
              alt="Avatar"
              src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
            />
            <div className="flex flex-col">
              <p className="text-lg">User</p>
              <p className="text-sm text-default-500">Role</p>
            </div>
            <div>
              <h1 className=" text-xl font-semibold">{classEvent.name}</h1>
            </div>
          </CardHeader>

          <CardBody>
            <p className=" relative text-base">
              {classEvent.description}
            </p>
          </CardBody>
          <hr></hr>
        </Card>
      ))}
    </div>
  );
};

ListPostPinned.Skeleton = function SkeletonClassEventList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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