import type { ResponseBack, SongResponse } from "@/interfaces/response.type";
import { axiosInstance } from "@/lib/axios";
import type { SongsType, SongType } from "@/schemas/song.schema";
import { uploadFile } from "./fileSerivce";

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

export async function createSong(song: SongType) {
  const res_song = await uploadFile(song.songFile);

  const newSong = {
    title: song.title,
    albums: song.albums,
    songFile: res_song?.data?.fileId,
  };

  const res = await axiosInstance.post("/songs", newSong);

  return res.data;
}

export async function createSongs({ songs }: SongsType) {
  const res = await Promise.all(
    songs.map((item) => {
      return createSong(item);
    })
  );

  return res;
}
