const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/attachment/";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : null;

export async function UploadFile(listFile: FileList, classroomId) {
  const formData = new FormData();
  const filesArray = Array.from(listFile);
  // Thêm từng tệp vào FormData
  filesArray.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("classroomId", classroomId);

  // Gửi yêu cầu POST với FormData
  const result = await fetch(DATA_SOURCE_URL + "upload-file", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const attachments = await result.json();
  return attachments;
}

export async function DownloadFile(fileId: number, classroomId) {
  const result = await fetch(DATA_SOURCE_URL + "download-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: fileId, classroomId: Number(classroomId) }),
  });

  return result;
}

export async function DeleteFile(fileId: number) {
  const result = await fetch(DATA_SOURCE_URL + "delete-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: fileId }),
  });

  return result;
}
