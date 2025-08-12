import type { AlbumResponse, ResponseBack } from "@/interfaces/response.type";
import { axiosInstance } from "@/lib/axios";

export async function getAllAlbums(): Promise<ResponseBack<AlbumResponse[]>> {
  const response = await axiosInstance.get("/album");
  const data = response.data;
  return data;
}

export async function getAlbumById(
  id: number
): Promise<ResponseBack<AlbumResponse>> {
  const response = await axiosInstance.get(`/album/${id}`);
  const data = response.data;
  return data;
}
