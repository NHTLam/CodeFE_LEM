"use client";

import React, { Fragment, useEffect, useState } from "react";
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
import { CheckIcon, ChevronDown, Menu, SendHorizontal, UsersRound } from "lucide-react";
import { FilterData } from "@/models/filter";
import { CreateClassEvent, FetchDataClassEvent } from "@/services/classevent-service";
import { ClassEvent } from "@/models/classevent";
import { Listbox, Transition } from "@headlessui/react";

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
  if (userId == "0") {
    return redirect("/select-org");
  }

  const filter: FilterData = {
    skip: 0,
    take: 10,
    isClassWork: true
  };

  const [classEvents, setClassEvents] = useState<any>();
  const [first, setFirst] = useState<any>(true);

  useEffect(() => {
    if (first == true) {
      const fetchData = async () => {
        const data = await FetchDataClassEvent(filter);
        setClassEvents(data);
      };
      fetchData();
      setFirst(false);
    }
  }, []);
  // const classEvents = [
  //   {
  //     id: 1,
  //     classroomId: 1,
  //     code: "CE1",
  //     name: "Thông báo quan trọng",
  //     isNotification: false,
  //     description: "Chuẩn bị có bài kiểm tra giữa kỳ",
  //     order: false,
  //     createdAt: "2024-02-26T14:22:40.267",
  //     endAt: "2024-02-26T07:20:22.36",
  //     updatedAt: "2024-02-26T14:22:40.267",
  //     deletedAt: null,
  //     comments: [
  //       {
  //         id: 1,
  //         classEventId: 1,
  //         description: "Mọi người nhớ làm bài đúng hạn",
  //       },
  //       {
  //         id: 2,
  //         classEventId: 1,
  //         description: "Đã hết hạn làm bài kiểm tra",
  //       },
  //     ],
  //     questions: [],
  //   },
  //   {
  //     id: 8,
  //     classroomId: 1,
  //     code: "CE4",
  //     name: "Thông báo điểm",
  //     isNotification: false,
  //     description: "Thông báo điểm kiểm tra giữa kỳ",
  //     order: true,
  //     createdAt: "2024-02-26T14:22:40.267",
  //     endAt: "2024-02-26T14:22:40.267",
  //     updatedAt: "2024-02-26T14:22:40.267",
  //     deletedAt: null,
  //     comments: [],
  //     questions: [],
  //   },
  //   {
  //     id: 10,
  //     classroomId: 1,
  //     code: "CE5",
  //     name: "Các sinh viên chú ý",
  //     isNotification: false,
  //     description: "Các bạn sinh viên chú ý hoàn thành bài tập đúng hạn",
  //     order: true,
  //     createdAt: "2024-02-26T14:22:40.267",
  //     endAt: "2024-02-26T14:22:40.267",
  //     updatedAt: "2024-02-26T14:22:40.267",
  //     deletedAt: null,
  //     comments: [],
  //     questions: [],
  //   },
  // ];

  const PostAction = [
    {
      name: "Pin",
    },
    {
      name: "Update",
    },
  ];

  const [post, setPost] = useState<any>(false);
  const [showComment, setShowComment] = useState<any>(false);
  const [selected, setSelected] = useState(PostAction[0]);

  const [id, setId] = useState<number>(0);
  const [classroomId, setClassroomId] = useState<number>(1);
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isClassWork, setIsClassWork] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [instruction, setInstruction] = useState<string>("");
  const [pinned, setPinned] = useState<boolean>(false);
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>();
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());
  const [deletedAt, setDeletedAt] = useState<Date>();
  const [classroom, setClassroom] = useState<any>();

  const CreatePost: ClassEvent = {
    id: id,
    classroomId: classroomId,
    code: code,
    name: name,
    isClassWork: isClassWork,
    description: description,
    instruction: instruction,
    pinned: pinned,
    createdAt: createdAt,
    endAt: endAt,
    updatedAt: updatedAt,
    deletedAt: deletedAt,
    classroom: classroom,
  }

  return (
    <div className="col-span-2 m-4 flex flex-col items-center space-y-4">
      <div className="ml-25 w-4/5 rounded-lg border border-slate-500 p-2 shadow-lg shadow-slate-400">
        {post == false ? (
          <button onClick={() => setPost(true)} className="w-full">
            <div className="p-5 flex flex-row gap-3">
              <img
                className="rounded-full border"
                width={60}
                alt="Avatar"
                src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
              />
              <div className=" flex flex-col">
                <p className="text-lg">User</p>
                <p className="text-default-500 text-sm">Role</p>
              </div>
              <h1 className="ml-40 items-center text-xl font-semibold">
                Create Post
              </h1>
            </div>
          </button>
        ) : (
          <div className="p-5 flex flex-col gap-3">
            <input
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Title"
              className="rounded-sm border border-cyan-600 px-2 focus:border-blue-400 focus:outline-none"
            />
            <textarea
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              className="h-30 rounded-sm border border-cyan-600 px-2 focus:outline-none" />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  CreateClassEvent(CreatePost);
                }}
                className="h-8 w-20 rounded-full border bg-primary text-white">
                Send
              </button>
              <button
                onClick={() => setPost(false)}
                className="h-8 w-20 rounded-full hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {classEvents?.map((classEvent, index) => (
        <div
          key={index}
          className="ml-25 w-4/5 rounded-lg border border-slate-500 p-2"
        >
          <div className="flex gap-3 justify-between items-center p-2">
            <div className="flex gap-3 items-center">
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
            </div>
            <div>
              <h1 className="text-xl font-semibold">{classEvent.name}</h1>
            </div>
            <div>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative z-10 pl-15">
                  <Listbox.Button >
                    <Menu className="text-gray-400" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {PostAction.map((action, actionId) => (
                        <Listbox.Option
                          key={actionId}
                          className={({ active }) =>
                            `relative w-full cursor-default select-none py-2 p-4 ${active ? "bg-amber-100 text-amber-900" : ""
                            }`
                          }
                          value={action}
                        >
                          {action.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

          </div>
          <div>
            <p className="p-2 relative text-base">{classEvent.description}</p>
          </div>
          <hr></hr>
          <div className="flex flex-col items-start gap-3 p-2">
            <button
              onClick={() => {
                setShowComment(!showComment);
              }}
              className="flex items-center gap-1 rounded-full p-2 hover:bg-slate-100"
            >
              <UsersRound size={20} />
              <p className="text-sm">Show all comment</p>
            </button>
            {showComment == true ? (
              <div>
                {classEvent.comments?.map((comment, index) => (
                  <div key={index} className="flex items-center gap-1 ">
                    <img
                      className="m-2 rounded-full border"
                      width={40}
                      alt="Avatar"
                      src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <p className="text-base">User</p>
                        <p className="text-xs">Time</p>
                      </div>
                      <h1 className=" text-sm">{comment.description}</h1>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="flex pr-5 w-full items-center gap-2">
              <img
                className="m-2 rounded-full border"
                width={40}
                alt="Avatar"
                src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
              />
              <input
                type="text"
                className="w-full rounded-full border border-slate-600 px-3 py-1 focus:outline-none"
              />
              <button>
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ListPost.Skeleton = function SkeletonClassEventList() {
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
