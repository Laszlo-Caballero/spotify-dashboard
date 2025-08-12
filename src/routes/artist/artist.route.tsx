import CreatePage from "@/pages/artist/create/page";
import EditPage from "@/pages/artist/edit/page";
import ArtistPage from "@/pages/artist/page";
import { Route, Routes } from "react-router";

export default function ArtistRoute() {
  return (
    <Routes>
      <Route path="/" element={<ArtistPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>
  );
}
