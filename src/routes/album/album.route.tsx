import CreateAlbumPage from "@/pages/album/create/page";
import EditAlbumPage from "@/pages/album/edit/page";
import AlbumPage from "@/pages/album/page";
import { Route, Routes } from "react-router";

export default function AlbumRoute() {
  return (
    <Routes>
      <Route path="/" element={<AlbumPage />} />
      <Route path="/create" element={<CreateAlbumPage />} />
      <Route path="/edit/:id" element={<EditAlbumPage />} />
    </Routes>
  );
}
