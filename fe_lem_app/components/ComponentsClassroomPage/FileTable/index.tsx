"use client";
import { LoadingForTable } from "@/components/LoadingForTable";
import { DeleteFile, DownloadFile, UploadFile } from "@/services/file-service";
import { Dialog, Transition } from "@headlessui/react";
import { Download, FileUp, Trash2 } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

interface FileTablePros {
  ParentCallBack: any;
  data: any;
}

export const FileTable = ({ ParentCallBack, data }: FileTablePros) => {
  var classroomId = "";
  if (typeof window !== "undefined") {
    classroomId = localStorage.getItem("classroomId") ?? "";
  }
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [attachments, setAttachments] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadFile = async () => {
    setLoading(true);
    const result = await UploadFile(selectedFile, classroomId);
    setAttachments(attachments.concat(result));
    setLoading(false);

    if ((result?.length ?? 0) !== 0 && ParentCallBack !== null) {
      ParentCallBack(result);
    }
    //window.location.reload();
  };

  useEffect(() => {
    if ((data?.length ?? 0) !== 0 && data !== undefined) {
      data.forEach((e) => {
        e.notDel = true;
      });

      const currentAttachments = attachments.concat(data);
      if (currentAttachments?.length > 0) {
        debugger;
        const distinctAttachments = currentAttachments.reduce(
          (acc, attachment) => {
            if (!acc.map((x) => x.id).includes(attachment.id)) {
              acc.push(attachment);
            }
            return acc;
          },
          [],
        );
        setAttachments(distinctAttachments);
      }
    }
  }, [data]);

  const handleDownloadFile = async (attachment) => {
    const result = await DownloadFile(attachment.id, classroomId);

    const blob = await result.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = attachment.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    // window.location.reload();
  };

  const handleDeleteFile = async (id) => {
    const result = await DeleteFile(id);
    const newAttachments = attachments.filter((x) => x.id !== id);
    setAttachments(newAttachments);
  };

  return (
    <>
      <div className="flex justify-between">
        <p>Attached files: </p>
        <button
          type="button"
          className="flex w-40 justify-center rounded-sm border border-green-500 py-1.5 text-sm text-green-500 hover:bg-green-100"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Upload File
        </button>
      </div>
      <div className="flex flex-col">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="w-24 whitespace-nowrap bg-gray-50">
                  <td className="w-1/12 whitespace-nowrap px-6 py-4">No</td>
                  <td className="w-7/12 whitespace-nowrap px-6 py-4">Name</td>
                  <td className="w-2/12 whitespace-nowrap px-6 py-4">
                    Capacity
                  </td>
                  <td className="w-2/12 whitespace-nowrap px-6 py-4">Action</td>
                </tr>
                {loading ? (
                  <>
                    <LoadingForTable />
                  </>
                ) : (
                  <>
                    {attachments?.length ?? 0 !== 0 ? (
                      <>
                        {attachments?.map((attachment, index) => (
                          <tr>
                            <td className="whitespace-nowrap px-6 py-4">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {attachment.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {(attachment.capacity / 1024).toFixed(2)} KB
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex">
                                <button
                                  onClick={() => handleDownloadFile(attachment)}
                                  className="mr-3 flex w-10 justify-center rounded-sm"
                                >
                                  <Download />
                                </button>
                                {attachment.notDel ? (
                                  <></>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleDeleteFile(attachment.id)
                                    }
                                    className="mr-3 flex w-10 justify-center rounded-sm"
                                  >
                                    <Trash2 />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                        <td className="whitespace-nowrap px-6 py-4 pr-20 text-right">
                          No Data
                        </td>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
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
                        <FileUp className="mr-2 h-10 w-10" />
                        Upload File
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="float-right flex w-20 justify-center rounded-sm border border-green-500 py-1.5 text-sm text-green-500 hover:bg-green-100"
                          onClick={() => {
                            setShowModal(false);
                            handleUploadFile();
                          }}
                        >
                          Upload
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
                      <div className="flex w-full items-center justify-center">
                        <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            {(selectedFile?.length ?? 0) !== 0 ? (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                File have selected
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            )}
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => setSelectedFile(e.target.files)}
                          />
                        </label>
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
