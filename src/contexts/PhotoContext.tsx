import { createContext, useContext } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchPhotos, deletePhoto, deletePhotos } from "../api/api";
import { Photo } from "../models/DataModel";

interface PhotoContextType {
  photos: Photo[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  deletePhoto: (id: string) => void;
  deletePhotos: (ids: string[]) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider = ({
  searchParams,
  children,
}: {
  searchParams: string[];
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["photos", searchParams],
      queryFn: ({ pageParam }) =>
        fetchPhotos({ lastId: pageParam, searchParams }),
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

  return (
    <PhotoContext.Provider
      value={{
        photos: data?.pages.flat() || [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        deletePhoto: deleteMutation,
        deletePhotos: deleteMultipleMutation,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotos must be used within a PhotoProvider");
  }
  return context;
};
