import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/page";
import ArtistRoute from "./routes/artist/artist.route";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/artist/*" element={<ArtistRoute />} />
      </Routes>
      <Toaster />
    </MainLayout>
  );
}

export default App;
