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
import { useEffect, useRef } from "react";

function App() {
  const queryClient = useQueryClient();
  const observerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
        console.log("fetching more....");
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        {(isFetchingNextPage || isLoading) && <p>Loading...</p>}
        <div ref={observerRef} style={{ height: "20px" }} />
      </main>
    </div>
  );
}

export default App;
