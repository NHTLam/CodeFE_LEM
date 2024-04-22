"use client";

import { DeleteClass } from "@/services/class-service";
import { Dialog, Transition } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import { Fragment, useState } from "react";

export const Setting = () => {
  var classroomId = "";
  var currentUserId = "";
  const [canRedirect, setCanRedirect] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
    currentUserId = localStorage.getItem("userId") ?? "";
  }

  async function handleDeleteClass() {
    const result = await DeleteClass(classroomId);
    setCanRedirect(true);
  }

  if (canRedirect === true) {
    const url = `/lem/home/user/${currentUserId}/user-home-page`;
    redirect(url);
  }

  return (
    <>
      <div className="mx-20 rounded-sm bg-white p-3">
        <div className="text-gray-700">
          <div className="px-4 py-2 text-lg font-semibold">
            Classroom Information
          </div>
          <div className="grid text-sm md:grid-cols-2">
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Class Name:</div>
              <div className="col-span-2 px-4 py-2">Jane</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Owner:</div>
              <div className="col-span-2 px-4 py-2">Doe</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Number of member:</div>
              <div className="col-span-2 px-4 py-2">2</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Number of groups:</div>
              <div className="col-span-2 px-4 py-2">2</div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="px-4 py-2 text-lg font-semibold text-rose-700">
            Danger zone
          </div>
          <div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="my-1 mr-10 flex w-60 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
            >
              Delete this class
            </button>
          </div>
        </div>
      </div>

      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
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
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg
                        bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div
                        className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                        justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                      >
                        <AlertTriangle
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Classroom
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this classroom?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDeleteClass}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                        shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
