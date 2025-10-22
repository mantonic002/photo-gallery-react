// src/hooks/usePhotoSearch.ts
import { useState } from "react";
import { TextSearchLocation } from "../api/api";

interface UsePhotoSearch {
  searchParams: string[];
  handleSearch: (query: string) => Promise<void>;
  resetSearch: () => void;
}

export const usePhotoSearch = (): UsePhotoSearch => {
  const [searchParams, setSearchParams] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchParams([]);
      return;
    }

    try {
      const locations = await TextSearchLocation(query);
      if (locations.length > 0) {
        const { boundingbox } = locations[0];
        setSearchParams(boundingbox);
      } else {
        setSearchParams([]);
      }
    } catch (error) {
      console.error("Error searching location:", error);
      setSearchParams([]);
    }
  };

  const resetSearch = () => {
    setSearchParams([]);
  };

  return { searchParams, handleSearch, resetSearch };
};
