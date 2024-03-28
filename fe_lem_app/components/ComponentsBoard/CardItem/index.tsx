"use client";

import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Draggable } from "@hello-pangea/dnd";
import {
  CheckCircle,
  CheckIcon,
  ChevronDown,
  ClipboardList,
  X,
} from "lucide-react";
import { title } from "process";
import { Fragment, useState } from "react";

//import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: {
    id: string;
    title: string;
    order: number;
    description: string | null;
    listId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  // const cardModal = useCardModal();
  const [showModal, setShowModal] = useState(false);

  const member = [
    { name: "Member A" },
    { name: "Member B" },
    { name: "Member C" },
  ];
  const [selected, setSelected] = useState(member[0]);

  function handleClick(e) {
    setShowModal(true);
  }

  function handleCloseModal(e) {
    setShowModal(false);
  }

  return (
    <>
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <button onClick={handleClick}>
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              role="button"
              //onClick={() => cardModal.onOpen(data.id)}
              className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
            >
              {data.title}
            </div>
          </button>
        )}
      </Draggable>

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
                    <div className="flex">
                      <div className="flex grow items-center text-2xl font-semibold">
                        <ClipboardList className="mr-2 h-10 w-10" />
                        Name
                      </div>
                      <button
                        className="float-right flex w-10 justify-center rounded-sm text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
                        onClick={handleCloseModal}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <form
                        action="submit"
                        // onSubmit={handleSubmit}
                      >
                        <div className="mt-2">
                          <div className="flex">
                            <p className="float-left mr-3 mt-2">Member: </p>
                            <div>
                              {/* Drop Down */}
                              <Listbox value={selected} onChange={setSelected}>
                                <div className="relative">
                                  <Listbox.Button className="relative my-1 flex w-full cursor-default justify-center rounded-lg border border-stroke bg-white py-2 pl-3 pr-10 text-left text-sm outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                                    <span className="block truncate">
                                      {selected.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDown className="h-5 w-5 text-gray-400" />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                      {member.map((person, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pr-4 ${
                                              active
                                                ? "bg-amber-100 text-amber-900"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value={person}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                {person.name}
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                          </div>

                          <div className="flex">
                            <p className="float-left mr-3 mt-2">Date: </p>
                            <div></div>
                          </div>

                          <div className="flex">
                            <p className="float-left mr-3 mt-2">Description:</p>
                            <div className="w-full">
                              <textarea
                                // onKeyDown={onTextareakeyDown}
                                // ref={ref}
                                className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-lg border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                                placeholder="Enter description"
                                // errors={fieldErrors}
                              />
                            </div>
                          </div>

                          <div className="flex">
                            <p className="float-left mr-3 mt-2">Todo: </p>
                            <div className="mt-4 w-full grow">
                              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2.5 w-1/4 rounded-full bg-blue-600" />
                              </div>
                            </div>
                            <p className="float-left ml-3 mt-2">50%</p>
                          </div>

                          <div className="ml-3 mt-2">
                            <div className="mb-4 flex items-center">
                              <input
                                type="checkbox"
                                value=""
                                className="h-4 w-4 rounded border-blue-300 bg-blue-100"
                              />
                              <label className="ms-2 text-sm font-medium dark:text-blue-300">
                                Default checkbox
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value=""
                                className="h-4 w-4 rounded border-blue-300 bg-blue-100"
                              />
                              <label className="ms-2 text-sm font-medium dark:text-blue-300">
                                Checked state
                              </label>
                            </div>
                            <button
                              type="button"
                              className="mt-3 flex w-50 justify-center rounded-sm border py-1 text-base outline-none transition-all duration-300 hover:border-blue-600 hover:bg-blue-200/5 hover:text-blue-600 dark:border-transparent dark:bg-red-200 dark:hover:border-blue-600 dark:hover:bg-red-200/5 dark:hover:text-blue-600 dark:hover:shadow-none"
                            >
                              Add choice
                            </button>
                          </div>

                          <div className="flex">
                            <p className="float-left mr-3 mt-2">History: </p>
                            <button
                              type="button"
                              className="float-right mt-3 flex w-50 grow justify-center rounded-sm border py-1 text-base outline-none transition-all duration-300 hover:border-blue-600 hover:bg-blue-200/5 hover:text-blue-600 dark:border-transparent dark:bg-red-200 dark:hover:border-blue-600 dark:hover:bg-red-200/5 dark:hover:text-blue-600 dark:hover:shadow-none"
                            >
                              View History
                            </button>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-25 sm:col-start-2"
                            // disabled={newEvent.title === ""}
                          >
                            Create
                          </button>
                        </div>
                      </form>
                    </div>
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
