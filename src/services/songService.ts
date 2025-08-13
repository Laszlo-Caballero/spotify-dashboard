import type { ResponseBack, SongResponse } from "@/interfaces/response.type";
import { axiosInstance } from "@/lib/axios";

export async function getAllSongs(): Promise<ResponseBack<SongResponse[]>> {
  const response = await axiosInstance.get("/songs");
  return response.data;
}

export async function getSongById(
  id: string
): Promise<ResponseBack<SongResponse>> {
  const response = await axiosInstance.get(`/songs/${id}`);
  return response.data;
}
