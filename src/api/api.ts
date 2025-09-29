import axios from "axios";
import { NominatimResult, Photo } from "../models/DataModel";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const fetchPhotos = async (options?: {
  lastId?: string;
  limit?: number;
  query?: string;
  dist?: string;
}): Promise<Photo[]> => {
  const { lastId, limit, query, dist } = options || {};

  // if query search by location
  if (query) {
    try {
      const locations = await TextSearchLocation(query);
      if (!locations.length) return [];
      const { lon, lat } = locations[0];
      return await searchPhotos(lon, lat, dist || "5");
    } catch (error) {
      console.error("Error in fetchPhotos (search):", error);
      throw error;
    }
  }
  // if no query default fetch
  else {
    try {
      const response = await axios.get<Photo[]>(API_URL + "/photos", {
        params: {
          lastId: lastId || "",
          limit: limit || 10,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

const TextSearchLocation = async (
  query: string
): Promise<NominatimResult[]> => {
  try {
    const response = await axios.get<NominatimResult[]>(
      process.env.REACT_APP_OSM_API_URL ||
        "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          limit: 1,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

const searchPhotos = async (
  long: string,
  lat: string,
  dist: string
): Promise<Photo[]> => {
  try {
    const response = await axios.get<Photo[]>(API_URL + "/photos/search", {
      params: {
        long: long,
        lat: lat,
        dist: dist,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deletePhoto = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/photos`, {
      params: {
        id: id,
      },
    });
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
