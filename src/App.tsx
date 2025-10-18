import { useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import DataList from "./components/DataList";
import LocationSearch from "./components/LocationSearch";
import { deletePhoto, deletePhotos, fetchPhotos } from "./api/api";
import { usePhotoSearch } from "./hooks/usePhotoSearch";
import { Photo } from "./models/DataModel";
import "./App.css";

function App() {
  const queryClient = useQueryClient();
  const observerRef = useRef<HTMLDivElement>(null);
  const { searchParams, handleSearch, resetSearch } = usePhotoSearch();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["photos", searchParams],
      queryFn: ({ pageParam }) =>
        fetchPhotos({ lastId: pageParam, ...searchParams }),
      getNextPageParam: (lastPage: Photo[]) => {
        if (lastPage.length < 10) return undefined;
        return lastPage[lastPage.length - 1].ID;
      },
      initialPageParam: undefined,
    });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deletePhoto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["photos"] }),
  });

  const { mutate: deleteMultipleMutation } = useMutation({
    mutationFn: deletePhotos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["photos"] }),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchWithReset = (params: { query: string; dist: string }) => {
    handleSearch(params.query, params.dist).then(() =>
      queryClient.resetQueries({ queryKey: ["photos"] })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <h3>Photo Gallery</h3>
          </li>
          <li>
            <LocationSearch onSearch={handleSearchWithReset} />
            <button
              onClick={() => {
                resetSearch();
                queryClient.resetQueries({ queryKey: ["photos"] });
              }}
            >
              Clear Search
            </button>
          </li>
        </ul>
      </header>
      <main className="App-main">
        {isLoading && !data && <p>Loading...</p>}
        {data && (
          <DataList
            data={data.pages.flat()}
            loadMore={fetchNextPage}
            deletePhoto={deleteMutation}
            deletePhotos={deleteMultipleMutation}
          />
        )}
        {isFetchingNextPage && <p>Loading more...</p>}
        <div ref={observerRef} style={{ height: "20px" }} />
      </main>
    </div>
  );
}

export default App;
