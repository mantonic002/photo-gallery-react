import React, { useState } from "react";
import DataItem from "./DataItem";
import { Photo } from "../models/DataModel";
import FullScreenImageSlider from "./FullScreenImageSlider";

interface DataListProps {
  data: Photo[];
  loadMore: (lastId?: string, limit?: number) => void;
  deletePhoto: (id: string) => void;
  // deletePhotos: (ids: string[]) => void;
}

function DataList({ data, loadMore, deletePhoto }: DataListProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const onItemClick = (id: string) => {
    data.forEach((item) => {
      if (item.ID === id) {
        setSelectedPhoto(item);
      }
    });
  };

  return (
    <>
      <div className="data-list">
        {data.map((item) => (
          <DataItem key={item.ID} data={item} onClick={onItemClick} />
        ))}
      </div>
      {selectedPhoto && (
        <FullScreenImageSlider
          photos={data}
          initialIndex={data.findIndex((p) => p.ID === selectedPhoto.ID)}
          onClose={() => setSelectedPhoto(null)}
          loadMore={loadMore}
          deletePhoto={deletePhoto}
        />
      )}
    </>
  );
}

export default DataList;
