import type {
  AlbumResponse,
  File,
  ResponseBack,
} from "@/interfaces/response.type";
import { axiosInstance } from "@/lib/axios";
import type { AlbumType } from "@/schemas/album.schema";

export async function getAllAlbums(
  artist?: string
): Promise<ResponseBack<AlbumResponse[]>> {
  const response = await axiosInstance.get("/album", {
    params: {
      artist,
    },
  });
  const data = response.data;
  return data;
}

export async function getAlbumById(
  id?: string
): Promise<ResponseBack<AlbumResponse>> {
  const response = await axiosInstance.get(`/album/${id}`);
  const data = response.data;
  return data;
}

export async function createAlbum(
  data: AlbumType
): Promise<ResponseBack<AlbumResponse>> {
  const formData = new FormData();
  formData.append("file", data.file);
  const res_image = await axiosInstance.post("/files", formData);
  const imageUrl: ResponseBack<File> = res_image.data;

  const response = await axiosInstance.post("/album", {
    NameAlbum: data.NameAlbum,
    releaseDate: data.releaseDate.toISOString().split("T")[0],
    coverFile: imageUrl.data.fileId,
    artists: data.artists,
  });
  const result = response.data;
  return result;
}

export async function updateAlbum({
  id,
  data,
  isUpdateImage,
}: {
  id?: string;
  data: AlbumType;
  isUpdateImage: boolean;
}) {
  const formData = new FormData();
  formData.append("file", data.file);

  let image: ResponseBack<File>;
  if (isUpdateImage) {
    const res_image = await axiosInstance.post("/files", formData);
    image = res_image.data;
  } else {
    image = {
      data: {
        fileId: data?.fileRes?.fileId || 0,
        fileName: data?.fileRes?.fileName || "",
      },
      code: 200,
      message: "",
    };
  }

  const album = {
    NameAlbum: data.NameAlbum,
    releaseDate: data.releaseDate.toISOString().split("T")[0],
    coverFile: image.data.fileId,
    artists: data.artists,
  };

  const response = await axiosInstance.put(`/album/${id}`, album);
  return response.data;
}

export async function deleteAlbum(id: string): Promise<ResponseBack<null>> {
  const response = await axiosInstance.delete(`/album/${id}`);
  return response.data;
}
