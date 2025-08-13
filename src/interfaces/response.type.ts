export interface ResponseBack<T> {
  code: number;
  message: string;
  data: T;
}

export interface ArtistResponse {
  artistId: number;
  name: string;
  description: string;
  status: boolean;
  albums: Album[];
  file: File;
  heroFile?: File;
}

export interface AlbumResponse {
  albumId: number;
  nameAlbum: string;
  releaseDate: string;
  status: boolean;
  songs: Song[];
  artists: Artist[];
  file: File;
}

export interface Album {
  albumId: number;
  nameAlbum: string;
  releaseDate: string;
  status?: boolean;
  songs: Song[];
  file?: File;
}
export interface Artist {
  artistId: number;
  name: string;
  description: string;
  status: boolean;
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
