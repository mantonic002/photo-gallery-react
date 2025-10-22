// src/api/api.ts
import axios from "axios";
import { NominatimResult, Photo } from "../models/DataModel";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

interface FetchPhotosParams {
  lastId?: string;
  limit?: number;
  searchParams?: string[];
}

export const fetchPhotos = async ({
  lastId = "",
  limit = 10,
  searchParams,
}: FetchPhotosParams): Promise<Photo[]> => {
  const isSearch = searchParams && searchParams.length > 0;
  const endpoint = isSearch ? "/photos/search" : "/photos";
  const params = {
    lastId,
    limit,
    ...(isSearch
      ? {
          latMin: searchParams[0],
          latMax: searchParams[1],
          longMin: searchParams[2],
          longMax: searchParams[3],
        }
      : {}),
  };

  try {
    const response = await axios.get<Photo[]>(`${API_URL}${endpoint}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const TextSearchLocation = async (
  query: string
): Promise<NominatimResult[]> => {
  try {
    const response = await axios.get<NominatimResult[]>(
      process.env.REACT_APP_OSM_API_URL ||
        "https://nominatim.openstreetmap.org/search",
      {
        params: { q: query, format: "json", limit: 1 },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

export const deletePhoto = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/photos`, { params: { id } });
  } catch (error) {
    console.error("Error deleting photo:", error);
    throw error;
  }
};

export const deletePhotos = async (ids: string[]): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/photos/bulk-delete`, { data: { ids } });
  } catch (error) {
    console.error("Error deleting photos:", error);
    throw error;
  }
};
