import React, { useState } from "react";
import DataItem from "./DataItem";
import { Photo } from "../models/DataModel";
import FullScreenImageSlider from "./FullScreenImageSlider";
import { FaRegTrashAlt } from "react-icons/fa";

interface DataListProps {
  data: Photo[];
  loadMore: (lastId?: string, limit?: number) => void;
  deletePhoto: (id: string) => void;
  deletePhotos: (ids: string[]) => void;
}

function DataList({
  data,
  loadMore,
  deletePhoto,
  deletePhotos,
}: DataListProps) {
  const [fsPhoto, setFsPhoto] = useState<Photo | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

  const onItemClick = (id: string) => {
    data.forEach((item) => {
      if (item.ID === id) {
        setFsPhoto(item);
      }
    });
  };

  const addToSelectedPhotos = (photo: Photo) => {
    setSelectedPhotos((prevSelected) => {
      const isAlreadySelected = prevSelected.some((p) => p.ID === photo.ID);
      if (isAlreadySelected) {
        return prevSelected.filter((p) => p.ID !== photo.ID);
      } else {
        return [...prevSelected, photo];
      }
    });
  };

  return (
    <>
      {selectedPhotos.length > 0 && (
        <div>
          <span>{selectedPhotos.length} selected</span>
          <button
            className="red-btn"
            onClick={() => {
              const idsToDelete = selectedPhotos.map((p) => p.ID);
              deletePhotos(idsToDelete);
              setSelectedPhotos([]);
            }}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      )}
      <div className="data-list">
        {data.map((item) => (
          <DataItem
            key={item.ID}
            data={item}
            onClick={onItemClick}
            addToSelectedPhotos={addToSelectedPhotos}
            isSelected={selectedPhotos.some((p) => p.ID === item.ID)}
          />
        ))}
      </div>
      {fsPhoto && (
        <FullScreenImageSlider
          photos={data}
          initialIndex={data.findIndex((p) => p.ID === fsPhoto.ID)}
          onClose={() => setFsPhoto(null)}
          loadMore={loadMore}
          deletePhoto={deletePhoto}
        />
      )}
    </>
  );
}

export default DataList;
