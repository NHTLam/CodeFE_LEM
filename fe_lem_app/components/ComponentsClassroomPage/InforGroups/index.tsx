"user client";
import { AppUser } from "@/models/app-user";
import { Board } from "@/models/board";
import { CreateBoardsFunction } from "@/models/createBoardsFunction";
import { ListAppUserByClassroom } from "@/services/app-user-service";
import { CreateBoardsForClass } from "@/services/board-service";
import { Dialog, Transition } from "@headlessui/react";
import { Contact, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

interface InforGroupsPros {
  dataBoards: Board[] | null;
}
export const InforGroups = ({ dataBoards }: InforGroupsPros) => {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [oldSelectedMembers, setOldSelectedMembers] = useState<number[]>([]);
  const [usersInClass, setUsersInClass] = useState<AppUser[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [numberGroupsCreate, setNumberGroupsCreate] = useState("");
  const [showError, setShowError] = useState(false);
  const [showErrorUser, setShowErrorUser] = useState(false);
  const [showErrorTable, setShowErrorTable] = useState(false);
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await ListAppUserByClassroom(Number(classroomId));
      const filterUsers = users?.filter(
        (user) =>
          user.appUserClassroomMappings?.some(
            (appUserClassroomMapping) =>
              appUserClassroomMapping.role?.name !== "Teacher",
          ),
      );
      setUsersInClass(filterUsers ?? []);
    };

    const fetchDataForSelectMember = () => {
      var oldSelectedMembers: number[] = [];
      dataBoards?.forEach((board) => {
        const data =
          board?.appUserBoardMappings?.map(
            (appUserBoardMapping) => appUserBoardMapping.appUserId,
          ) ?? [];
        oldSelectedMembers.push(...data);
      });
      setOldSelectedMembers(oldSelectedMembers);
      setSelectedMembers(oldSelectedMembers);
    };
    fetchDataForSelectMember();
    fetchData();
  }, [dataBoards]);

  async function handleAutoCreateBoards() {
    if ((selectedMembers?.length ?? 0) === 0) {
      setShowErrorUser(true);
      setTimeout(() => {
        setShowErrorUser(false);
      }, 2000);
    }
    if (numberGroupsCreate === null || numberGroupsCreate === "") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    } else if (Number(numberGroupsCreate) < Number(dataBoards?.length ?? 0)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    } else if (Number(numberGroupsCreate) > (selectedMembers?.length ?? 0)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    } else {
      const createBoardsFunction: CreateBoardsFunction = {
        numberOfGroups: Number(numberGroupsCreate),
        classroomId: Number(classroomId),
        appUserIds: selectedMembers,
      };
      const result = await CreateBoardsForClass(createBoardsFunction);
      window.location.reload();
    }
  }

  function handleNewMemberForBoards() {
    const checked = oldSelectedMembers.some(
      (memberId) => usersInClass?.map((user) => user.id).includes(memberId),
    );
    if (checked) {
      setShowErrorTable(true);
    }
  }

  function handleTickNewMemberForBoards(userId: number) {
    if (selectedMembers.includes(userId)) {
      const newSelectedMembers: number[] = selectedMembers.filter(
        (element) => element !== userId,
      );
      setSelectedMembers(newSelectedMembers);
    } else {
      const newSelectedMembers: number[] = selectedMembers.concat(userId);
      setSelectedMembers(newSelectedMembers);
    }
  }

  function handleTickAllNewMemberForBoards() {
    if (selectedMembers.length === usersInClass?.length) {
      setSelectedMembers([]);
    } else {
      const fullStudentId = usersInClass?.map((user) => user?.id ?? 0) ?? [];
      const newSelectedMembers: number[] = selectedMembers.concat(
        ...fullStudentId,
      );
      setSelectedMembers(newSelectedMembers);
    }
  }

  return (
    <>
      <div className="mx-30 grid grid-cols-2 gap-4">
        <div className="">
          <p className="font-semibold">
            Number of groups in className: {dataBoards?.length ?? 0}
          </p>
          <p className="font-semibold">
            Number of members who participated:{" "}
            {selectedMembers?.length - (dataBoards?.length ?? 0)}
          </p>
          <p className="font-semibold">
            Members who have not joined:{" "}
            {(usersInClass?.length ?? 0) -
              (selectedMembers?.length ?? 0) +
              (dataBoards?.length ?? 0)}
          </p>
        </div>

        <div className="border-l pl-10">
          <div className="flex">
            <p className="font-semibold">Number of groups in className:</p>
            <input
              onChange={(e) => setNumberGroupsCreate(e.target.value)}
              type="number"
              className="ml-5 flex grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            />
          </div>
          {showError ? (
            <p className="text-sm text-rose-500">
              Can not empty or smaller than number of current groups or greater
              than number of student
            </p>
          ) : (
            <></>
          )}
          <div className="flex">
            <p className="mt-1 font-semibold">User: </p>
            <button
              onClick={() => setShowModal(true)}
              className="ml-5 flex w-30 rounded-sm border border-stroke px-3 py-1 pl-4 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            >
              Select User
            </button>
            {(selectedMembers?.length ?? 0) === 0 ? (
              <p className="ml-5 mt-1">(Selected: none)</p>
            ) : (
              <>
                {selectedMembers.length === (usersInClass?.length ?? 0) ? (
                  <p className="ml-5 mt-1">(Selected: all)</p>
                ) : (
                  <p className="ml-5 mt-1">
                    (Selected:{" "}
                    {selectedMembers.length - (dataBoards?.length ?? 0)})
                  </p>
                )}
              </>
            )}
          </div>
          {showErrorUser ? (
            <p className="text-sm text-rose-500">Can not empty</p>
          ) : (
            <></>
          )}
          <button
            onClick={handleAutoCreateBoards}
            className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none"
          >
            Auto Fill classmate in to group
          </button>
        </div>
      </div>

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
                <Dialog.Panel className="relative w-1/2 rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                  <div>
                    <div className="flex">
                      <div className="flex grow items-center text-2xl font-semibold">
                        <Contact className="mr-2 h-10 w-10" />
                        List student
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="float-right flex w-20 justify-center rounded-sm border border-green-500 py-1.5 text-sm text-green-500 hover:bg-green-100"
                          onClick={() => {
                            setShowModal(false);
                            handleNewMemberForBoards();
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="float-right mr-3 flex w-20 justify-center rounded-sm border border-rose-500 py-1.5 text-sm text-rose-500 hover:bg-rose-100"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <div className="mt-2">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="p-4">
                                  <div className="flex items-center">
                                    <input
                                      id="checkbox-all-search"
                                      type="checkbox"
                                      onClick={() =>
                                        handleTickAllNewMemberForBoards()
                                      }
                                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                    />
                                    <label className="sr-only">checkbox</label>
                                  </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  User name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Student full name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Role
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersInClass?.map((user, userIdx) => (
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                  <td className="w-4 p-4">
                                    <div className="flex items-center">
                                      <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        checked={selectedMembers.some(
                                          (memberId) => memberId === user.id,
                                        )}
                                        onClick={() =>
                                          handleTickNewMemberForBoards(
                                            user.id ?? 0,
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                      />
                                      <label className="sr-only">
                                        checkbox
                                      </label>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">{user.userName}</td>
                                  <td className="px-6 py-4">{user.fullName}</td>
                                  <td className="px-6 py-4">
                                    {user.appUserClassroomMappings !== null
                                      ? user
                                          .appUserClassroomMappings!.map(
                                            (mapping) => mapping.role?.name,
                                          )
                                          .join(", ")
                                      : ""}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {showErrorTable ? (
                          <p className="mt-2 text-sm text-rose-500">
                            You can not untick user already in board
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
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
