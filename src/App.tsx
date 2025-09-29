import DataList from "./components/DataList";
import { deletePhoto, deletePhotos, fetchPhotos } from "./api/api";
import "./App.css";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryFn: () => fetchPhotos(),
    queryKey: ["photos"],
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deletePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const { mutate: deleteMultipleMutation } = useMutation({
    mutationFn: deletePhotos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const getPhotos = (lastId?: string, limit?: number) => {};

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <h3>Photo Gallery</h3>
          </li>
          <li>{/* <LocationSearch onSearch={onSearchPhotos} /> */}</li>
        </ul>
      </header>
      <main className="App-main">
        <DataList
          data={photos || []}
          loadMore={getPhotos}
          deletePhoto={deleteMutation}
          deletePhotos={deleteMultipleMutation}
        />
      </main>
    </div>
  );
}

export default App;
