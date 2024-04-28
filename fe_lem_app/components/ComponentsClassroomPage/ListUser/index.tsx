"use client";
import { AppUser } from "@/models/app-user";
import {
  ListAppUserByClassroom,
  UpdateAppUser,
} from "@/services/app-user-service";
import { GetClass } from "@/services/class-service";
import { ListRole } from "@/services/role-service";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar } from "@nextui-org/react";
import {
  Users,
  GraduationCap,
  UserCog,
  UserRoundX,
  MessageCircleMore,
  Code,
  X,
  ShieldBan,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export const ListUser = () => {
  const [usersInClass, setUsersInClass] = useState<AppUser[] | null>(null);
  const [roles, setRoles] = useState<any>();
  const [fullDataRoles, setFullDataRoles] = useState<any>();
  const [showGetCodeModal, setShowGetCodeModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [classroomCode, setClassroomCode] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [updateUser, setUpdateUser] = useState<any>();

  var currentUserId = "";
  var classroomId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
    classroomId = localStorage.getItem("classroomId") ?? "";
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await ListAppUserByClassroom(Number(classroomId));
      setUsersInClass(users);
      if (users !== null) {
        const newRoles = users!.flatMap(
          (user) => user.appUserClassroomMappings?.map((a) => a.role),
        );
        if (newRoles !== null) {
          const uniqueSet = new Set(newRoles.map((role) => role!.id)); //Lấy những id không bị trùng
          const uniqueRoles = Array.from(uniqueSet).map((id) =>
            newRoles.find((role) => role!.id === id),
          ); //map lại
          setRoles(uniqueRoles);
        }
      }
      const classroom = await GetClass(Number(classroomId));
      console.log("Class Code: " + classroom?.code);
      setClassroomCode(classroom?.code ?? "");

      const fetchRoleData = async () => {
        const rolesData = await ListRole(Number(classroomId), false);
        if (rolesData !== null) {
          setFullDataRoles(rolesData);
        }
      };
      fetchRoleData();
    };
    fetchData();
    console.log("usersInClass2: " + usersInClass);
  }, []);

  function handleTickAllNewRole() {
    if (selectedRoles.length === fullDataRoles?.length) {
      setSelectedRoles([]);
    } else {
      const fullRoleId = fullDataRoles?.map((role) => role?.id ?? 0) ?? [];
      const newSelectedRole: number[] = selectedRoles.concat(...fullRoleId);
      setSelectedRoles(newSelectedRole);
    }
  }

  function handleTickNewRole(roleId: number) {
    if (selectedRoles.includes(roleId)) {
      const newSelectedRole: number[] = selectedRoles.filter(
        (element) => element !== roleId,
      );
      setSelectedRoles(newSelectedRole);
    } else {
      const newSelectedMembers: number[] = selectedRoles.concat(roleId);
      setSelectedRoles(newSelectedMembers);
    }
  }

  function handleViewRoleOfCurrentUser(user) {
    const roleIds = user.appUserClassroomMappings.map((x) => x.roleId);
    setShowRoleModal(true);
    setSelectedRoles(roleIds);
    setUpdateUser(user);
  }

  async function handleSaveUser() {
    var newAppUserClassroomMappings: any = [];
    selectedRoles.forEach((roleId) => {
      const newAppUserClassroomMapping = {
        appUserId: Number(currentUserId),
        classroomId: Number(classroomId),
        roleId: roleId,
      };
      newAppUserClassroomMappings.push(newAppUserClassroomMapping);
    });

    updateUser.appUserClassroomMappings = newAppUserClassroomMappings;
    debugger;
    const result = await UpdateAppUser(updateUser);
    setShowRoleModal(false);
    window.location.reload();
  }

  return (
    <>
      {roles === null || roles === undefined ? (
        <></>
      ) : (
        <>
          {roles?.map((role) => (
            <>
              <div className="mx-40 flex">
                <div className="flex items-center text-2xl font-semibold text-blue-500">
                  {role.id === 3 ? ( //default id of role Teacher in db is 3
                    <GraduationCap className="mr-2 h-10 w-10" />
                  ) : (
                    <Users className="mr-2 h-10 w-10" />
                  )}
                  {role.name}
                </div>
                <div className="absolute right-45 flex">
                  {role.name == "Teacher" ? (
                    <button
                      onClick={() => setShowGetCodeModal(true)}
                      className="my-1 flex w-40 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                    >
                      Get Code of Class
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <hr className="mx-40 my-2" />
              {usersInClass?.map((user) => (
                <>
                  {user
                    .appUserClassroomMappings!.map((x) => x.roleId)
                    .includes(role.id) ? (
                    <div className="mx-40 my-2 flex items-center gap-x-4 pb-4 pl-3">
                      <div className="relative">
                        <Avatar className="h-[40px] w-[40px]" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-semibold">{user.userName}</p>
                        <div className="text-muted-foreground flex items-center text-xs">
                          Full name: {user.fullName}, Email: {user.email},
                          Phone: {user.phone}
                        </div>
                      </div>
                      <div className="absolute right-45 flex gap-2">
                        <button
                          onClick={() => handleViewRoleOfCurrentUser(user)}
                          className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                        >
                          <UserCog className="w-full" />
                        </button>
                        {user.id === Number(currentUserId) ? (
                          <></>
                        ) : (
                          <button className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none">
                            <Link href="">
                              <UserRoundX className="w-full" />
                            </Link>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </>
          ))}

          <Transition.Root show={showGetCodeModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={setShowGetCodeModal}
            >
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
                            <Code className="mr-2 h-10 w-10" />
                            Class Code
                          </div>
                          <button
                            type="button"
                            className="float-right flex w-10 justify-center rounded-sm text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
                            onClick={() => setShowGetCodeModal(false)}
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <hr className="my-2" />
                        <div className="text-2sm flex grow items-center font-semibold">
                          Classroom code for teacher:
                          <p className="ml-3 text-cyan-700">{classroomCode}</p>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          <Transition.Root show={showRoleModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={setShowRoleModal}
            >
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
                            <ShieldBan className="mr-2 h-10 w-10" />
                            List Role
                          </div>
                          <div className="">
                            <button
                              type="button"
                              className="float-right flex w-20 justify-center rounded-sm border border-green-500 py-1.5 text-sm text-green-500 hover:bg-green-100"
                              onClick={handleSaveUser}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="float-right mr-3 flex w-20 justify-center rounded-sm border border-rose-500 py-1.5 text-sm text-rose-500 hover:bg-rose-100"
                              onClick={() => setShowRoleModal(false)}
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
                                          onClick={() => handleTickAllNewRole()}
                                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                        />
                                        <label className="sr-only">
                                          checkbox
                                        </label>
                                      </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      Permisson
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {fullDataRoles?.map((role) => (
                                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                      <td className="w-4 p-4">
                                        <div className="flex items-center">
                                          <input
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            checked={selectedRoles.some(
                                              (roleId) => roleId === role.id,
                                            )}
                                            onClick={() =>
                                              handleTickNewRole(role.id ?? 0)
                                            }
                                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                          />
                                          <label className="sr-only">
                                            checkbox
                                          </label>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4">{role.name}</td>
                                      <td className="px-6 py-4">
                                        {role.description}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
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
      )}
    </>
  );
};
