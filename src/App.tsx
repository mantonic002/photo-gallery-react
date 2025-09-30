import DataList from "./components/DataList";
import { deletePhoto, deletePhotos, fetchPhotos } from "./api/api";
import "./App.css";

import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Photo } from "./models/DataModel";

function App() {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      Photo[],
      Error,
      InfiniteData<Photo[]>,
      [_: string],
      string | undefined
    >({
      queryKey: ["photos"],
      queryFn: ({ pageParam }) => fetchPhotos(pageParam, 10),
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 10) return undefined;
        return lastPage[lastPage.length - 1].ID;
      },
      initialPageParam: undefined,
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
          data={data?.pages.flat() || []}
          loadMore={fetchNextPage}
          deletePhoto={deleteMutation}
          deletePhotos={deleteMultipleMutation}
        />
        <button
          onClick={() => {
            if (hasNextPage) fetchNextPage();
          }}
        >
          Load more
        </button>
      </main>
    </div>
  );
}

export default App;
