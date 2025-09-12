import React from "react";
import { Photo } from "../models/DataModel";
import { API_URL } from "../api/api";

interface DataItemProps {
  data: Photo;
  onClick: (id: string) => void;
}

function DataItem({ data, onClick }: DataItemProps) {
  return (
    <div className="data-item" onClick={() => onClick(data.ID)}>
      <img src={`${API_URL}/files/${data.ID}_thumb.jpg`} alt={data.ID} />
    </div>
  );
}

export default DataItem;
