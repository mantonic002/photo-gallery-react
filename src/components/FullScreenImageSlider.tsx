import React, { useEffect, useState } from "react";
import { Photo } from "../models/DataModel";
import { API_URL } from "../api/api";
import { FaCaretLeft, FaCaretRight, FaRegTrashAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { usePhotos } from "../contexts/PhotoContext";
import JwtImg from "./JwtImg";

interface FullScreenImageSliderProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

function FullScreenImageSlider({
  initialIndex,
  onClose,
}: FullScreenImageSliderProps) {
  const { photos, fetchNextPage, hasNextPage, deletePhoto } = usePhotos();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // load more images when close to end
  useEffect(() => {
    if (currentIndex >= photos.length - 2 && hasNextPage) {
      fetchNextPage();
    }
  }, [currentIndex, photos, fetchNextPage]);

  // set initial index
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // navigate to next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex !== photos.length - 1) {
        return prevIndex + 1;
      }
      return 0;
    });
  };

  // navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleDelete = () => {
    if (photos.length === 0) return;
    onClose();
    deletePhoto(photos[currentIndex].ID);
    return;
  };

  return (
    <div className="slider">
      <div className="slider-options">
        <button
          className="slider-btn"
          onClick={handleDelete}
          title="Delete Photo"
        >
          <FaRegTrashAlt />
        </button>
        <button className="slider-btn" onClick={onClose}>
          <FaX />
        </button>
      </div>
      {photos.length > 0 && photos[currentIndex] && (
        <>
          <JwtImg
            src={`${API_URL}/files/${photos[currentIndex].ID}.jpg`}
            alt={photos[currentIndex].ID}
          />
          <div className="slider-navigation">
            <button className="slider-btn" onClick={prevImage}>
              <FaCaretLeft />
            </button>
            <button className="slider-btn" onClick={nextImage}>
              <FaCaretRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FullScreenImageSlider;
