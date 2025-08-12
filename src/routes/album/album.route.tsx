import CreateAlbumPage from "@/pages/album/create/page";
import AlbumPage from "@/pages/album/page";
import { Route, Routes } from "react-router";

export default function AlbumRoute() {
  return (
    <Routes>
      <Route path="/" element={<AlbumPage />} />
      <Route path="/create" element={<CreateAlbumPage />} />
    </Routes>
  );
}
