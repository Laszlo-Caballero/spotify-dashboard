import type { ArtistType } from "@/schemas/artist.schema";
import type {
  ArtistResponse,
  File,
  ResponseBack,
} from "../interfaces/response.type";
import { axiosInstance } from "../lib/axios";
import { uploadFile } from "./fileSerivce";

export async function getAllArtist(): Promise<ResponseBack<ArtistResponse[]>> {
  const response = await axiosInstance.get("/artist");
  const data = response.data;
  return data;
}

export async function getArtistById(
  id?: string
): Promise<ResponseBack<ArtistResponse>> {
  const response = await axiosInstance.get(`/artist/${id}`);
  const data = response.data;
  return data;
}

export async function getArtistByName(
  name: string
): Promise<ResponseBack<ArtistResponse[]>> {
  const response = await axiosInstance.get(`/artist/search?name=${name}`);
  const data = response.data;
  return data;
}

export async function createArtist(data: ArtistType) {
  const [cover, hero] = await Promise.all([
    uploadFile(data.file),
    uploadFile(data.heroFile),
  ]);

  const artist = {
    Name: data.Name,
    description: data.description,
    coverArtist: cover.data.fileId,
    heroCover: hero.data.fileId,
  };

  const response = await axiosInstance.post("/artist", artist);
  return response.data;
}

export async function updateArtist({
  id,
  data,
  isUpdateImage,
  isUpdateHeroImage,
}: {
  id?: string;
  data: ArtistType;
  isUpdateImage: boolean;
  isUpdateHeroImage: boolean;
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
  const formDataHero = new FormData();
  formDataHero.append("file", data.heroFile);

  let hero: ResponseBack<File>;

  if (isUpdateHeroImage) {
    const res_hero = await axiosInstance.post("/files", formDataHero);
    hero = res_hero.data;
  } else {
    hero = {
      data: {
        fileId: data?.heroRes?.fileId || 0,
        fileName: data?.heroRes?.fileName || "",
      },
      code: 200,
      message: "",
    };
  }

  const artist = {
    Name: data.Name,
    description: data.description,
    coverArtist: image.data?.fileId,
    heroCover: hero.data?.fileId,
  };

  const response = await axiosInstance.put(`/artist/${id}`, artist);
  return response.data;
}

export async function deleteArtist(id?: string) {
  const response = await axiosInstance.delete(`/artist/${id}`);
  return response.data;
}
