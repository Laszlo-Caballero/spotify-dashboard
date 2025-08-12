import type { ArtistResponse, ResponseBack } from "../interfaces/response.type";
import { axiosInstance } from "../lib/axios";

export async function getAllArtist(): Promise<ResponseBack<ArtistResponse[]>> {
  const response = await axiosInstance.get("/artist");
  const data = response.data;
  return data;
}
