const DATA_SOURCE_URL = process.env.BASE_URL + "/lem/attachment/";
const token = localStorage.getItem("token") ?? "";

export async function UploadFile(listFile: FileList, questionId: number) {
  const formData = new FormData();
  const filesArray = Array.from(listFile);
  // Thêm từng tệp vào FormData
  filesArray.forEach((file) => {
    formData.append("files", file);
  });

  // Thêm questionId vào FormData
  formData.append("questionId", questionId.toString());

  // Gửi yêu cầu POST với FormData
  const result = await fetch(DATA_SOURCE_URL + "upload-file", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return result;
}

export async function DownloadFile(fileId: number) {
  const result = await fetch(DATA_SOURCE_URL + "download-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: fileId }),
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
