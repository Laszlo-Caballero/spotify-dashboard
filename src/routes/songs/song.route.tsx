import SongCreate from "@/pages/songs/create/page";
import SongPage from "@/pages/songs/page";
import { Route, Routes } from "react-router";

export default function SongRoute() {
  return (
    <Routes>
      <Route path="/" element={<SongPage />} />
      <Route path="create" element={<SongCreate />} />
    </Routes>
  );
}
