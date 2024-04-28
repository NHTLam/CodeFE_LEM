"use client";
import { Role } from "@/models/appUserClassroomMapping";
import { Classroom } from "@/models/classroom";
import { ListAppUserByClassroom } from "@/services/app-user-service";
import { DeleteClass, GetClass } from "@/services/class-service";
import { ListPath, ListPermission } from "@/services/permission-service";
import {
  CreateRole,
  DeleteRole,
  ListRole,
  UpdateRole,
} from "@/services/role-service";
import { Dialog, Transition } from "@headlessui/react";
import { AlertTriangle, Edit, ShieldBan, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export const Setting = () => {
  const [canRedirect, setCanRedirect] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classroom, setClassroom] = useState<Classroom>();
  const [roles, setRoles] = useState<any>();
  const [permissions, setPermissions] = useState<any>();
  const [displayPermissions, setDisplayPermissions] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [newRole, setNewRole] = useState<any>();
  const [updateRole, setUpdateRole] = useState<any>();
  const [showError, setShowError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [listPath, setListPath] = useState<any>();
  const [removeFromDisplayPermissions, setRemoveFromDisplayPermissions] =
    useState<any>();

  var classroomId = "";
  var currentUserId = "";
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

  useEffect(() => {
    const fetchData = async () => {
      const classroomData = await GetClass(Number(classroomId));
      if (classroomData !== null) {
        setClassroom(classroomData!);
      }
    };
    fetchData();

    const fetchRoleData = async () => {
      const rolesData = await ListRole(Number(classroomId), false);
      if (rolesData !== null) {
        setRoles(rolesData);
      }
    };
    fetchRoleData();

    const fetchPermissionData = async () => {
      const permissionData = await ListPermission(Number(classroomId));
      if (permissionData !== null) {
        const distinctPermissionData = permissionData.filter(
          (item, index) =>
            permissionData.findIndex(
              (otherObj) => otherObj.name === item.name,
            ) === index,
        );
        const removeFromDisplayPermissionDatas = permissionData.filter(
          (x) => !distinctPermissionData.map((y) => y.id).includes(x.id),
        );
        setRemoveFromDisplayPermissions(removeFromDisplayPermissionDatas);
        setPermissions(permissionData);
        setDisplayPermissions(distinctPermissionData);
      }
    };
    fetchPermissionData();

    const getListPath = async () => {
      const data = await ListPath(classroomId);
      setListPath(data);
    };
    getListPath();
  }, []);

  async function handleSaveRole() {
    const currentSelectedPermission = permissions.filter((x) =>
      selectedPermissions.includes(x.id),
    );
    const getSameRemovePermission = removeFromDisplayPermissions.filter((x) =>
      currentSelectedPermission.map((y) => y.name).includes(x.name),
    );

    const newPermissionForRole = currentSelectedPermission.concat(
      getSameRemovePermission,
    );
    var newPermissionRoleMappings: any = [];
    newPermissionForRole.forEach((element) => {
      const newPermissionRoleMapping = {
        permissionId: element.id,
      };
      newPermissionRoleMappings.push(newPermissionRoleMapping);
    });

    if (isEdit) {
      const currentUpdateRole = {
        id: updateRole.id,
        name: newRole?.name ?? "",
        description: newRole?.description ?? "",
        permissionRoleMappings: newPermissionRoleMappings,
      };
      if (
        newRole?.name === null ||
        newRole?.name === "" ||
        newRole?.name === undefined
      ) {
        currentUpdateRole.name = updateRole.name;
      }
      if (
        newRole?.description === null ||
        newRole?.description === "" ||
        newRole?.name === undefined
      ) {
        currentUpdateRole.description = updateRole.description;
      }
      const result = await UpdateRole(currentUpdateRole, classroomId);
      setShowModal(false);
      //window.location.reload();
    } else {
      if (
        newRole?.name === null ||
        newRole?.name === undefined ||
        newRole?.name === ""
      ) {
        setShowError(true);
      } else {
        const newRoleData = {
          name: newRole.name,
          description: newRole.description,
          permissionRoleMappings: newPermissionRoleMappings,
        };
        const result = await CreateRole(newRoleData, classroomId);
        setShowModal(false);
        window.location.reload();
      }
    }
  }

  function handleTickAllNewPermissionForRole() {
    if (selectedPermissions.length === displayPermissions?.length) {
      setSelectedPermissions([]);
    } else {
      const fullpermissionId =
        displayPermissions?.map((permission) => permission?.id ?? 0) ?? [];
      const newSelectedPermission: number[] = selectedPermissions.concat(
        ...fullpermissionId,
      );
      setSelectedPermissions(newSelectedPermission);
    }
  }

  function handleTickNewPermssionForRole(permissionId: number) {
    if (selectedPermissions.includes(permissionId)) {
      const newSelectedPermission: number[] = selectedPermissions.filter(
        (element) => element !== permissionId,
      );
      setSelectedPermissions(newSelectedPermission);
    } else {
      const newSelectedMembers: number[] =
        selectedPermissions.concat(permissionId);
      setSelectedPermissions(newSelectedMembers);
    }
  }

  async function handleDeleteRole(roleId: number) {
    const result = await DeleteRole(roleId, classroomId);
    window.location.reload();
  }

  function handleViewPermssionOfCurrentRole(role) {
    const permissionIds = role.permissionRoleMappings.map(
      (x) => x.permissionId,
    );
    setUpdateRole(role);
    setSelectedPermissions(permissionIds);
    setShowModal(true);
    setIsEdit(true);
  }

  var isAllowMangeRole = false;
  var isAllowDeleteClass = false;
  if (listPath !== null && listPath !== undefined) {
    isAllowMangeRole = listPath.some(
      (path) => path === "/lem/role/create-role",
    );

    isAllowDeleteClass = listPath.some(
      (path) => path === "/lem/classroom/delete",
    );
  }

  return (
    <>
      <div className="mx-20 rounded-sm p-3">
        <div className="text-gray-700">
          <div className="px-4 py-2 text-lg font-semibold">
            Classroom Information
          </div>
          <div className="grid text-sm md:grid-cols-2">
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Class Name:</div>
              <div className="col-span-2 px-4 py-2">{classroom?.name}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Owner:</div>
              <div className="col-span-2 px-4 py-2">Teacher</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Number of member:</div>
              <div className="col-span-2 px-4 py-2">20</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="px-4 py-2 font-semibold">Number of groups:</div>
              <div className="col-span-2 px-4 py-2">4</div>
            </div>
          </div>
          {isAllowMangeRole ? (
            <>
              <hr className="my-5" />
              <div>
                <div className="flex px-4 py-2">
                  <div className="flex grow items-center text-lg font-semibold">
                    Manage Role
                  </div>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(true);
                        setIsEdit(false);
                        setSelectedPermissions([]);
                      }}
                      className="float-right flex w-20 justify-center rounded-sm border border-green-500 py-1.5 text-sm text-green-500 hover:bg-green-100"
                    >
                      Add Role
                    </button>
                  </div>
                </div>
                <div className="mt-3 px-4 text-center sm:mt-5">
                  <div className="mt-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="w-1/6 px-6 py-3">
                              No
                            </th>
                            <th scope="col" className="w-1/6 px-6 py-3">
                              Role Name
                            </th>
                            <th scope="col" className="w-1/6 px-6 py-3">
                              Role Type
                            </th>
                            <th scope="col" className="w-1/3 px-6 py-3">
                              Description
                            </th>
                            <th
                              scope="col"
                              className="w-1/6 self-center px-6 py-3"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {roles?.map((role, roleIdx) => (
                            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">{roleIdx + 1}</td>
                              <td className="px-6 py-4">{role.name}</td>
                              <td className="px-6 py-4">
                                {role.roleTypeId == 1
                                  ? "Default"
                                  : "User Create"}
                              </td>
                              <td className="px-6 py-4">{role.description}</td>
                              <td className="px-6 py-4">
                                {role.roleTypeId == 1 ? (
                                  <div className="flex">
                                    <button
                                      disabled={true}
                                      className="mr-3 flex w-10 justify-center rounded-sm text-gray-400"
                                    >
                                      <Edit />
                                    </button>
                                    <button
                                      disabled={true}
                                      className="mr-3 flex w-10 justify-center rounded-sm  text-gray-400"
                                    >
                                      <Trash2 />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        handleViewPermssionOfCurrentRole(role)
                                      }
                                      className="mr-3 flex w-10 justify-center rounded-sm text-blue-600"
                                    >
                                      <Edit />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRole(role.id)}
                                      className="mr-3 flex w-10 justify-center rounded-sm  text-rose-600"
                                    >
                                      <Trash2 />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {isAllowDeleteClass ? (
            <>
              <hr className="my-5" />
              <div className="px-4 py-2 text-lg font-semibold text-rose-700">
                Danger zone
              </div>
              <div className="px-4 py-2">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="my-1 mr-10 flex w-60 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none"
                >
                  Delete this class
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
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
                        <ShieldBan className="mr-2 h-10 w-10" />
                        List permission
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="float-right flex w-20 justify-center rounded-sm border border-green-500 py-1.5 text-sm text-green-500 hover:bg-green-100"
                          onClick={handleSaveRole}
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
                    <div className="mt-5 flex gap-x-10">
                      <div className="flex">
                        <p>Role Name:</p>
                        <input
                          onChange={(e) =>
                            setNewRole({ ...newRole, name: e.target.value })
                          }
                          type="text"
                          placeholder={isEdit ? updateRole.name : ""}
                          className="ml-5 flex grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                        />
                      </div>
                      <div className="flex">
                        <p>Description:</p>
                        <input
                          onChange={(e) =>
                            setNewRole({
                              ...newRole,
                              description: e.target.value,
                            })
                          }
                          placeholder={isEdit ? updateRole.description : ""}
                          type="text"
                          className="ml-5 flex grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                        />
                      </div>
                    </div>
                    {showError ? (
                      <p className="text-sm text-rose-500">
                        Role Name can not null
                      </p>
                    ) : (
                      <></>
                    )}
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
                                        handleTickAllNewPermissionForRole()
                                      }
                                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                    />
                                    <label className="sr-only">checkbox</label>
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
                              {displayPermissions?.map((permission) => (
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                  <td className="w-4 p-4">
                                    <div className="flex items-center">
                                      <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        checked={selectedPermissions.some(
                                          (permissionId) =>
                                            permissionId === permission.id,
                                        )}
                                        onClick={() =>
                                          handleTickNewPermssionForRole(
                                            permission.id ?? 0,
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                      />
                                      <label className="sr-only">
                                        checkbox
                                      </label>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {permission.name}
                                  </td>
                                  <td className="px-6 py-4">
                                    {permission.description}
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
  );
};
