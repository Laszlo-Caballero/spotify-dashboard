import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import ArtistRoute from "./routes/artist/artist.route";
import { Toaster } from "./components/ui/sonner";
import AlbumRoute from "./routes/album/album.route";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/album/*" element={<AlbumRoute />} />
        <Route path="/artist/*" element={<ArtistRoute />} />
      </Routes>
      <Toaster />
    </MainLayout>
  );
}

export default App;
