import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/page";
import ArtistPage from "./pages/artist/page";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
