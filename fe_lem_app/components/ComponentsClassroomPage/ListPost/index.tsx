"use client";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { any } from "zod";
import {
  CheckCircle,
  CheckIcon,
  ChevronDown,
  Menu,
  SendHorizontal,
  UsersRound,
} from "lucide-react";
import { FilterData } from "@/models/filter";
import {
  CreateClassEvent,
  ListClassEvent,
  UpdateClassEvent,
} from "@/services/class-event-service";
import { ClassEvent } from "@/models/classevent";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CreateComment } from "@/services/comment-service";

export const ListPost = () => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  const filter: FilterData = {
    skip: 0,
    take: 10,
    classroomId: Number(classroomId),
    isClassWork: false,
  };

  const [classEvents, setClassEvents] = useState<any>();
  const [first, setFirst] = useState<any>(true);

  useEffect(() => {
    if (first == true) {
      const fetchData = async () => {
        const data = await ListClassEvent(filter);
        setClassEvents(data);
      };
      fetchData();
      setFirst(false);
    }
  }, []);

  const PostAction = [
    {
      name: "Pin",
    },
    {
      name: "Update",
    },
  ];

  const [post, setPost] = useState<any>(false);
  const [description, setDescription] = useState<any>("");
  const [descriptionComment, setDescriptionComment] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [showModal, setShowModal] = useState<any>(false);
  const [selected, setSelected] = useState(PostAction[0]);

  const [createPost, setCreatePost] = useState({
    id: 0,
    classroomId: Number(classroomId),
    code: "",
    name: "",
    isClassWork: false,
    description: "",
    instruction: "",
    pinned: false,
    createdAt: new Date(),
    endAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  });

  const UpdateClassEventFunc = (createPost, name, description) => {
    const data = {
      id: createPost.id,
      classroomId: createPost.classroomId,
      code: createPost.code,
      name: name,
      isClassWork: createPost.isClassWork,
      description: description,
      instruction: createPost.instruction,
      pinned: createPost.pinned,
      createdAt: new Date(),
      endAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };
    UpdateClassEvent(data);
  };

  const actionComment = (classEventId, descriptionComment) => {
    const data = {
      id: 0,
      classEventId: classEventId,
      description: descriptionComment,
    };
    console.log(data);

    CreateComment(data);
    window.location.reload();
  };

  const showUpdateModal = (index, classEvent) => {
    if (index == 1) {
      setShowModal(true);
      const data = {
        id: classEvent.id,
        classroomId: classEvent.classroomId,
        code: classEvent.code,
        name: classEvent.name,
        isClassWork: classEvent.isClassWork,
        description: classEvent.description,
        instruction: classEvent.instruction,
        comment: [classEvent.comment],
        pinned: classEvent.pinned,
        createdAt: new Date(),
        endAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      setCreatePost(data);
    } else {
      const data = {
        id: classEvent.id,
        classroomId: classEvent.classroomId,
        code: classEvent.code,
        name: classEvent.name,
        isClassWork: classEvent.isClassWork,
        description: classEvent.description,
        instruction: classEvent.instruction,
        comment: [classEvent.comment],
        pinned: true,
        createdAt: new Date(),
        endAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      UpdateClassEvent(data);
      window.location.reload();
    }
  };
  return (
    <div className="col-span-2 m-4 flex flex-col items-center space-y-4">
      <div className="ml-25 w-4/5 rounded-lg border border-slate-500 p-2 shadow-lg shadow-slate-400">
        {post == false ? (
          <button onClick={() => setPost(true)} className="w-full">
            <div className="flex flex-row items-center gap-3 p-5">
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
              <h1 className="ml-60 items-center text-xl font-semibold">
                Create Post
              </h1>
            </div>
          </button>
        ) : (
          <div className="flex flex-col gap-3 p-5">
            <input
              name="name"
              value={createPost.name}
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
              type="text"
              placeholder="Title"
              className="rounded-sm border border-cyan-600 px-2 focus:border-blue-400 focus:outline-none"
            />
            <textarea
              name="description"
              value={createPost.description}
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Description"
              className="h-30 rounded-sm border border-cyan-600 px-2 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  CreateClassEvent(createPost);
                  window.location.reload();
                }}
                className="h-8 w-20 rounded-full border bg-primary text-white"
              >
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
      {classEvents?.map((classEvent) => (
        <div
          key={classEvent.id}
          className="ml-25 w-4/5 rounded-lg border border-slate-500 p-2"
        >
          <div className="flex items-center justify-between gap-3 p-2">
            <div className="flex items-center gap-3">
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
                  <Listbox.Button>
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
                            `relative w-full cursor-default select-none p-4 py-2 ${
                              active ? "bg-amber-100 text-amber-900" : ""
                            }`
                          }
                          value={action}
                          onClick={() => showUpdateModal(actionId, classEvent)}
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
            <p className="relative p-2 text-base">{classEvent.description}</p>
          </div>
          <hr></hr>
          <div className="flex flex-col items-start gap-3 p-2">
            <section className="grid place-items-center">
              <label>
                <input
                  className="peer/showLabel absolute scale-0"
                  type="checkbox"
                />
                <span className="block max-h-14 overflow-hidden px-4 py-0 transition-all duration-300 peer-checked/showLabel:max-h-52">
                  <h3 className="flex h-14 cursor-pointer items-center font-semibold">
                    <UsersRound size={20} />
                    Show all comment
                  </h3>
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
                </span>
              </label>
            </section>

            <div className="flex w-full items-center gap-2 pr-5">
              <img
                className="m-2 rounded-full border"
                width={40}
                alt="Avatar"
                src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
              />
              <input
                name="description"
                type="text"
                className="w-full rounded-full border border-slate-600 px-3 py-1 focus:outline-none"
                onChange={(e) => setDescriptionComment(e.target.value)}
              />
              <button
                onClick={() => actionComment(classEvent.id, descriptionComment)}
              >
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
      ))}

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update Post
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="name"
                          name="title"
                          className="block w-full rounded-md border-0 py-1.5 pl-3 
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset 
                                focus:ring-violet-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Title"
                        />
                        <textarea
                          name="description"
                          className="mt-5 block w-full rounded-md border-0 py-1.5 pl-3 
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset 
                                focus:ring-violet-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Description"
                        />
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-25 sm:col-start-2"
                          onClick={() =>
                            UpdateClassEventFunc(createPost, name, description)
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
