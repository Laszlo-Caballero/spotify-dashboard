import type {
  File as FileBack,
  ResponseBack,
} from "@/interfaces/response.type";
import { axiosInstance } from "@/lib/axios";

export async function uploadFile(file: File): Promise<ResponseBack<FileBack>> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosInstance.post("/files", formData);

  return res.data;
}
