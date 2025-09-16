import React, { useState } from "react";
import DataItem from "./DataItem";
import { Photo } from "../models/DataModel";
import FullScreenImageSlider from "./FullScreenImageSlider";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const [dataByDate, setDataByDate] = useState<{ [date: string]: Photo[] }>({});

  // Group data by date
  React.useEffect(() => {
    const groupedData: { [date: string]: Photo[] } = {};
    data.forEach((item) => {
      const date = new Date(item.TakenAt).toDateString();
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    setDataByDate(groupedData);
  }, [data]);

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
        <motion.div
          initial={{ opacity: 0, y: -50, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -50, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          layout // Ensures smooth layout shift for other content
        >
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
        </motion.div>
      )}
      {Object.entries(dataByDate).map(([date, items]) => (
        <>
          <h3>{date}</h3>
          <div className="data-list" key={date}>
            {items.map((item) => (
              <DataItem
                key={item.ID}
                data={item}
                onClick={onItemClick}
                addToSelectedPhotos={addToSelectedPhotos}
                isSelected={selectedPhotos.some((p) => p.ID === item.ID)}
              />
            ))}
          </div>
        </>
      ))}
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
