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
  DeleteClassEvent,
  ListClassEvent,
  UpdateClassEvent,
} from "@/services/class-event-service";
import { ClassEvent } from "@/models/classevent";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CreateComment } from "@/services/comment-service";

export const ListPostPinned = () => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  const filter: FilterData = {
    skip: 0,
    take: 10,
    pinned: true,
    isClassWork: false,
    orderby: 0,
    ordertype: 1,
  };

  const [classEvents, setClassEvents] = useState<any>();
  const [first, setFirst] = useState<any>(true);
  const [showModal, setShowModal] = useState<any>(false);
  const [detailClassEvent, setDetailClassEvent] = useState({
    id: 0,
    classroomId: 1,
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

  const showDetail = (classEvent) => {
    setShowModal(true);
    setDetailClassEvent(classEvent);
  };

  const ConvertDateTime = (datetime) => {
    const convert = new Date(datetime);
    const format = `${convert.getHours()}:${convert.getMinutes()}, ${convert.getDate()}/${
      convert.getMonth() + 1
    }/${convert.getFullYear()}`;
    return format;
  };

  return (
    <div className="h-fit w-full max-w-md rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 sm:p-4 sm:pt-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="ml-4 text-xl font-bold leading-none text-gray-900 dark:text-white">
          Pinned Posts
        </h5>
      </div>
      <hr />
      <div className="flow-root h-96 overflow-auto">
        {classEvents?.map((classEvent) => (
          <button
            onClick={() => showDetail(classEvent)}
            key={classEvent.id}
            role="list"
            className="hover:pointer w-full divide-y divide-gray-200 rounded-lg p-2 hover:bg-slate-100 dark:divide-gray-700"
          >
            <li className="list-none py-3 sm:py-4 ">
              <div className="items-center justify-items-start sm:grid sm:grid-flow-row-dense sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full border"
                    width={50}
                    alt="Avatar"
                    src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                  />
                  <div className="flex flex-col justify-start">
                    <p className="text-base">{classEvent.appUser.userName}</p>
                    <p className="text-xs">
                      {ConvertDateTime(classEvent.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="text-base font-semibold">{classEvent.name}</h1>
                </div>
              </div>
            </li>
          </button>
        ))}
      </div>

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
                        {detailClassEvent.name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="mt-5 w-full py-1.5 pl-3 text-start text-gray-900 ">
                          {detailClassEvent.description}
                        </p>
                      </div>
                      <div className="mt-5 justify-items-end sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-20 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-2 sm:mt-0"
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

ListPostPinned.Skeleton = function SkeletonClassEventList() {
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
