import axios from "axios";
import { Photo } from "../models/DataModel";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const fetchPhotos = async (
  lastId?: string,
  limit?: number
): Promise<Photo[]> => {
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
};

export const searchPhotos = async (
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
    await axios.delete(`${API_URL}/photos`, { data: { ids } });
  } catch (error) {
    console.error("Error deleting photos:", error);
    throw error;
  }
};
