import React from "react";
import { Photo } from "../models/DataModel";
import { API_URL } from "../api/api";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import JwtImg from "./JwtImg";

interface DataItemProps {
  data: Photo;
  onClick: (id: string) => void;
  addToSelectedPhotos: (photo: Photo) => void;
  isSelected: boolean;
}

function DataItem({
  data,
  onClick,
  addToSelectedPhotos,
  isSelected,
}: DataItemProps) {
  return (
    <div className="data-item">
      <div className="image-container">
        <JwtImg
          src={`${API_URL}/files/${data.ID}_thumb.jpg`}
          alt={data.ID}
          onClick={() => onClick(data.ID)}
        />
        <button
          className={`select-btn ${isSelected ? "selected" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            addToSelectedPhotos(data);
          }}
          aria-label={isSelected ? "Deselect photo" : "Select photo"}
        >
          <span className="checkmark">
            {isSelected ? <FaCheckCircle /> : <FaRegCheckCircle />}
          </span>
        </button>
      </div>
    </div>
  );
}

export default DataItem;
