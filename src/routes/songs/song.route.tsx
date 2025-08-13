import SongPage from "@/pages/songs/page";
import { Route, Routes } from "react-router";

export default function SongRoute() {
  return (
    <Routes>
      <Route path="/" element={<SongPage />} />
    </Routes>
  );
}
