// src/hooks/usePhotoSearch.ts
import { useState } from "react";
import { TextSearchLocation } from "../api/api";

export interface SearchParams {
  lat?: string;
  long?: string;
  dist?: string;
}

interface UsePhotoSearch {
  searchParams: SearchParams;
  handleSearch: (query: string, dist: string) => Promise<void>;
  resetSearch: () => void;
}

export const usePhotoSearch = (): UsePhotoSearch => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleSearch = async (query: string, dist: string) => {
    if (!query.trim() || !dist.trim()) {
      setSearchParams({});
      return;
    }

    try {
      const locations = await TextSearchLocation(query);
      if (locations.length > 0) {
        const { lat, lon } = locations[0];
        setSearchParams({ lat, long: lon, dist });
      } else {
        setSearchParams({});
      }
    } catch (error) {
      console.error("Error searching location:", error);
      setSearchParams({});
    }
  };

  const resetSearch = () => {
    setSearchParams({});
  };

  return { searchParams, handleSearch, resetSearch };
};
