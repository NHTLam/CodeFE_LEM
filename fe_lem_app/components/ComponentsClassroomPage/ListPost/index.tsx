"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";

import { Skeleton } from "@/components/ui/skeleton";
import { any } from "zod";
import { SendHorizontal, UsersRound } from "lucide-react";

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

export const ListPost = () => {
  const { userId } = useFakeAuth();
  if (userId == '0') {
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
      "id": 1,
      "classroomId": 1,
      "code": "CE1",
      "name": "Thông báo quan trọng",
      "isNotification": false,
      "description": "Chuẩn bị có bài kiểm tra giữa kỳ",
      "order": false,
      "createdAt": "2024-02-26T14:22:40.267",
      "endAt": "2024-02-26T07:20:22.36",
      "updatedAt": "2024-02-26T14:22:40.267",
      "deletedAt": null,
      "comments": [
        {
          "id": 1,
          "classEventId": 1,
          "description": "Mọi người nhớ làm bài đúng hạn"
        },
        {
          "id": 2,
          "classEventId": 1,
          "description": "Đã hết hạn làm bài kiểm tra"
        }
      ],
      "questions": []
    },
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
  const [post, setPost] = useState<any>(false);
  const [showComment, setShowComment] = useState<any>(false);

  return (
    <div className="col-span-2 flex items-center flex-col space-y-4 m-4">
      <Card className="w-4/5 p-2 border rounded-lg border-slate-500 ml-25 shadow-lg shadow-slate-400">
        {post == false ? (
          <button onClick={() => setPost(true)}>
            <CardHeader className="flex flex-row gap-3">
              <img className="border rounded-full"
                width={60}
                alt="Avatar"
                src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
              />
              <div className=" flex flex-col">
                <p className="text-lg">User</p>
                <p className="text-sm text-default-500">Role</p>
              </div>
              <h1 className="ml-40 items-center text-xl font-semibold">Create Post</h1>
            </CardHeader>
          </button>
        ) : (<CardBody className="flex flex-col gap-3">
          <p className="text-sm font-semibold">Title</p>
          <input type="text" className="px-2 border rounded-sm border-cyan-600 focus:border-blue-400 focus:outline-none" />
          <textarea className="px-2 h-30 border rounded-sm border-cyan-600 focus:outline-none" />
          <div className="flex justify-end gap-3">
            <button className="w-20 h-8 border rounded-full text-white bg-primary" >Send</button>
            <button onClick={() => setPost(false)} className="w-20 h-8 rounded-full hover:bg-slate-100">Cancel</button>
          </div>
        </CardBody>)}
      </Card>
      {classEvents?.map((classEvent, index) => (
        <Card key={index} className="w-4/5 p-2 border rounded-lg border-slate-500 ml-25">
          <CardHeader className="flex gap-3">
            <img className="border rounded-full"
              width={60}
              alt="Avatar"
              src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
            />
            <div className="flex flex-col">
              <p className="text-base">User</p>
              <p className="text-xs">Time</p>
            </div>
            <div>
              <h1 className="ml-25 text-xl font-semibold">{classEvent.name}</h1>
            </div>
          </CardHeader>
          <CardBody>
            <p className=" relative text-base">
              {classEvent.description}
            </p>
          </CardBody>
          <hr></hr>
          <CardFooter className="flex flex-col gap-3 items-start">
            <button onClick={() => { setShowComment(!showComment) }} className="flex gap-1 items-center p-2 rounded-full hover:bg-slate-100">
              <UsersRound size={20} />
              <p className="text-sm">Show all comment</p>
            </button>
            {showComment == true ? (
              <div>
                {
                  classEvent.comments?.map((comment, index) => (
                    <div key={index} className="flex gap-1 items-center ">
                      <img className="border rounded-full m-2"
                        width={40}
                        alt="Avatar"
                        src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-3 items-center">
                          <p className="text-base">User</p>
                          <p className="text-xs">Time</p>
                        </div>
                        <h1 className=" text-sm">{comment.description}</h1>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : <></>}
            <div className="flex w-full gap-2 items-center">
              <img className="border rounded-full m-2"
                width={40}
                alt="Avatar"
                src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
              />
              <input type="text" className="px-2 w-full border rounded-full border-slate-600 focus:outline-none" />
              <SendHorizontal className=""/>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

ListPost.Skeleton = function SkeletonClassEventList() {
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