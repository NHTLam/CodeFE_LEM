"use client";

import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Draggable } from "@hello-pangea/dnd";
import Datepicker from "react-tailwindcss-datepicker";
import {
  Check,
  CheckCircle,
  CheckIcon,
  ChevronDown,
  ClipboardList,
  SendHorizontal,
  UsersRound,
  X,
} from "lucide-react";
import { title } from "process";
import { Fragment, useEffect, useState } from "react";
import { Job } from "@/models/job";
import { Todo } from "@/models/todo";
import { DeleteJob, UpdateJob } from "@/services/job-service";
import { Board } from "@/models/board";
import { CreateComment } from "@/services/comment-service";

//import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Job;
  index: number;
  boardData: Board;
}

export const JobItem = ({ data, index, boardData }: CardItemProps) => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  const [showModal, setShowModal] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [todoCheckBoxes, setTodoCheckBoxes] = useState<Todo[]>(
    data.todos ?? [],
  );
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [updateTodoCheckBox, setUpdateTodoCheckBox] = useState("");
  const [value, setValue] = useState({
    startDate: data.startAt ?? null,
    endDate: data.endAt ?? null,
  });
  const [job, setJob] = useState<Job>(data);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setJob({
      ...job,
      startAt: newValue.startDate,
      endAt: newValue.endDate,
    });
  };

  const member = [
    { name: "Member A" },
    { name: "Member B" },
    { name: "Member C" },
  ];
  const [selected, setSelected] = useState(member[0]);

  function handleClick() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleAddTodo = () => {
    const todo: Todo = {
      id: 0,
      jobId: data.id,
      description: "Default option",
    };
    setTodoCheckBoxes((prevTodoCheckBoxes) => [...prevTodoCheckBoxes, todo]);
  };

  const handleRemoveTodo = (index: number) => {
    const deletedTodoCheckBoxes = [
      ...todoCheckBoxes.slice(0, index),
      ...todoCheckBoxes.slice(index + 1),
    ];
    setTodoCheckBoxes(deletedTodoCheckBoxes);
  };

  const handleUpdateTodo = (index: number) => {
    handleRemoveTodo(index);
    const todo: Todo = {
      id: 0,
      jobId: data.id,
      description: updateTodoCheckBox,
      isDone: false,
    };
    setTodoCheckBoxes((prevTodoCheckBoxes) => [...prevTodoCheckBoxes, todo]);
    setIsEditTodo(false);
  };

  const handleUpdateIsDoneTodo = (todo, index: number) => {
    var isDone = false;
    if (todo.isDone === true) {
      isDone = false;
    } else {
      isDone = true;
    }
    handleRemoveTodo(index);
    const newTodo: Todo = {
      id: 0,
      jobId: data.id,
      description: todo.description,
      isDone: isDone,
    };
    setTodoCheckBoxes((prevTodoCheckBoxes) => [...prevTodoCheckBoxes, newTodo]);
  };

  const handleUpdateJob = async () => {
    const updateJob = job;
    if (updateJob.todos === null) {
      updateJob.todos = [];
    }
    updateJob!.todos = todoCheckBoxes;
    const result = await UpdateJob(updateJob, classroomId);
    console.log("result: " + result);
    window.location.reload();
  };

  const handleDeleteJob = async () => {
    const deleteJob = job;
    const result = await DeleteJob(deleteJob?.id ?? 0, classroomId);
    window.location.reload();
  };

  const ConvertDateTime = (datetime) => {
    const convert = new Date(datetime);
    const format = `${convert.getHours()}:${convert.getMinutes()}, ${convert.getDate()}/${
      convert.getMonth() + 1
    }/${convert.getFullYear()}`;
    return format;
  };

  const actionComment = async (classEventId, descriptionComment) => {
    const data = {
      id: 0,
      classEventId: classEventId,
      description: descriptionComment,
    };
    console.log(data);

    await CreateComment(data);
  };

  return (
    <>
      <Draggable draggableId={data.id!.toString()} index={index}>
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
              {data.name}
            </div>
          </button>
        )}
      </Draggable>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
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
                <Dialog.Panel className="relative rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                  <div>
                    <div className="flex gap-y-2">
                      <div className="flex grow items-center text-2xl font-semibold">
                        <ClipboardList className="mr-2 h-10 w-10" />
                        {data.name}
                      </div>
                      <button
                        type="button"
                        className="float-right flex w-10 justify-center rounded-sm text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
                        onClick={handleCloseModal}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <form>
                        <div className="mt-2">
                          {boardData.classroomId !== null &&
                          boardData.classroomId !== 0 ? (
                            <div className="flex">
                              <p className="float-left mr-3 mt-2">Member: </p>
                              <div className="z-10">
                                {/* Drop Down */}
                                <Listbox
                                  value={selected}
                                  onChange={setSelected}
                                >
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
                          ) : (
                            <></>
                          )}

                          <div className="mb-2 flex">
                            <p className="float-left mr-3 mt-2 grow">Date: </p>
                            <div className="w-full overflow-visible">
                              <Datepicker
                                value={value}
                                onChange={handleValueChange}
                                containerClassName="relative"
                              />
                            </div>
                          </div>

                          <div className="flex">
                            <p className="float-left mr-3 mt-2">Description:</p>
                            <div className="w-full">
                              <textarea
                                className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-lg border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                                placeholder={data.description}
                                onChange={(e) =>
                                  setJob({
                                    ...job,
                                    description: e.target.value
                                      ? e.target.value
                                      : data.description,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="flex">
                            <p className="float-left mr-3 mt-2">Todo: </p>
                            <div className="mt-4 w-full grow">
                              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  className="h-2.5 rounded-full bg-blue-600"
                                  style={{ width: `${job.noTodoDone}%` }}
                                />
                              </div>
                            </div>
                            <p className="float-left ml-3 mt-2">
                              {job.noTodoDone}%
                            </p>
                          </div>

                          <div className="ml-3 mt-2">
                            {todoCheckBoxes !== null ? (
                              <>
                                {todoCheckBoxes?.map((todo, index) => (
                                  <div className="mb-4 flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={todo.isDone}
                                      onClick={() =>
                                        handleUpdateIsDoneTodo(todo, index)
                                      }
                                      className="h-4 w-4 rounded border-blue-300 bg-blue-100"
                                    />
                                    {isEditTodo === false ? (
                                      <label
                                        onClick={() => setIsEditTodo(true)}
                                        className="ms-2 text-sm font-medium dark:text-blue-300"
                                      >
                                        {todo.description}
                                      </label>
                                    ) : (
                                      <>
                                        <input
                                          className="text-body-color dark:text-body-color-dark dark:shadow-two ml-2 flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                                          placeholder={todo.description}
                                          onChange={(e) =>
                                            setUpdateTodoCheckBox(
                                              e.target.value,
                                            )
                                          }
                                        />
                                        <button
                                          type="button"
                                          className="flex w-10 justify-center rounded-sm text-base outline-none transition-all duration-300 hover:border-green-600 hover:bg-green-200/5 hover:text-green-600 dark:border-transparent dark:bg-green-200 dark:hover:border-green-600 dark:hover:bg-green-200/5 dark:hover:text-green-600 dark:hover:shadow-none"
                                          onClick={() =>
                                            handleUpdateTodo(index)
                                          }
                                        >
                                          <Check className="h-4 w-4" />
                                        </button>
                                      </>
                                    )}
                                    <button
                                      type="button"
                                      className="flex w-10 justify-center rounded-sm text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
                                      onClick={() => handleRemoveTodo(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <></>
                            )}
                            <button
                              onClick={handleAddTodo}
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
                              onClick={() => {
                                viewHistory === true
                                  ? setViewHistory(false)
                                  : setViewHistory(true);
                              }}
                              className="float-right mt-3 flex w-50 grow justify-center rounded-sm border py-1 text-base outline-none transition-all duration-300 hover:border-blue-600 hover:bg-blue-200/5 hover:text-blue-600 dark:border-transparent dark:bg-red-200 dark:hover:border-blue-600 dark:hover:bg-red-200/5 dark:hover:text-blue-600 dark:hover:shadow-none"
                            >
                              View History
                            </button>
                          </div>
                          {viewHistory === true ? (
                            <>
                              <div className="flex w-full items-center gap-2">
                                <img
                                  className="m-2 rounded-full border"
                                  width={40}
                                  alt="Avatar"
                                  src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                                />
                                <p>
                                  User {job?.creator?.userName} tạo ngày:
                                  {" " + ConvertDateTime(job.createAt)}
                                </p>
                              </div>
                              <div className="flex w-full items-center gap-2">
                                <img
                                  className="m-2 rounded-full border"
                                  width={40}
                                  alt="Avatar"
                                  src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                                />
                                <p>
                                  User {job?.creator?.userName} cập nhật mới
                                  nhất vào ngày:
                                  {" " + ConvertDateTime(job.updateAt)}
                                </p>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}

                          <div className="mt-5 flex">
                            <p className="float-left mr-3">Comment </p>
                          </div>
                          <div className="flex w-full items-center gap-2">
                            <img
                              className="m-2 rounded-full border"
                              width={40}
                              alt="Avatar"
                              src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                            />
                            <input
                              type="text"
                              className="w-full rounded-full border px-3 py-1 focus:outline-none"
                            />
                            <SendHorizontal />
                          </div>
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
                                  {/* {job.comments?.map((comment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-1 "
                                    >
                                      <img
                                        className="m-2 rounded-full border"
                                        width={40}
                                        alt="Avatar"
                                        src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                                      />
                                      <div className="flex flex-col gap-1">
                                        <div className="flex items-end gap-3">
                                          <p className="text-base">
                                            {comment.appUser.userName}
                                          </p>
                                          <p className="text-xs">
                                            {ConvertDateTime(comment.createdAt)}
                                          </p>
                                        </div>
                                        <h1 className=" text-sm">
                                          {comment.description}
                                        </h1>
                                      </div>
                                    </div>
                                  ))} */}
                                </div>
                              </span>
                            </label>
                          </section>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-25 sm:col-start-2"
                            onClick={handleUpdateJob}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-rose-500 shadow-sm ring-1 ring-inset ring-rose-500 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={handleDeleteJob}
                          >
                            Delete
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
