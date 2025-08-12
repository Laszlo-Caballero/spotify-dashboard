export interface ResponseBack<T> {
  code: number;
  message: string;
  data: T;
}

export interface ArtistResponse {
  artistId: number;
  Name: string;
  description: string;
  status: boolean;
  albums: Album[];
  file: File;
}

export interface Album {
  albumId: number;
  NameAlbum: string;
  releaseDate: string;
  status?: boolean;
  songs: Song[];
  file?: File;
}

export interface Song {
  songId: number;
  title: string;
  views: number;
  status: boolean;
  file?: File;
}

export interface File {
  fileId: number;
  fileName: string;
}
