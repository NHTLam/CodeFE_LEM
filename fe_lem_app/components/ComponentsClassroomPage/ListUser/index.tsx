"use client";
import { AppUser } from "@/models/app-user";
import { ListAppUserByClassroom } from "@/services/app-user-service";
import { GetClass } from "@/services/class-service";
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
} from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export const ListUser = () => {
  const [usersInClass, setUsersInClass] = useState<AppUser[] | null>(null);
  const [roles, setRoles] = useState<any>();
  const [showGetCodeModal, setShowGetCodeModal] = useState(false);
  const [classroomCode, setClassroomCode] = useState("");

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
    };
    fetchData();
    console.log("usersInClass2: " + usersInClass);
  }, []);

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
                      className="my-1 mr-3 flex w-40 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                    >
                      Get Code of Class
                    </button>
                  ) : (
                    <></>
                  )}
                  <button className="my-1 flex w-40 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                    Add Member
                  </button>
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
                        <button className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                          <Link href="">
                            <UserCog className="w-full" />
                          </Link>
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
                        <button className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
                          <Link href="">
                            <MessageCircleMore className="w-full" />
                          </Link>
                        </button>
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
        </>
      )}
    </>
  );
};
