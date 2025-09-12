import { useState } from "react";

interface LocationSearchProps {
  onSearch: (params: { long: string; lat: string; dist: string }) => void;
}

function LocationSearch({ onSearch }: LocationSearchProps) {
  const [long, setLong] = useState<string | "">("");
  const [lat, setLat] = useState<string | "">("");
  const [dist, setDist] = useState<string | "">("");

  const handleSearch = () => {
    onSearch({ long, lat, dist });
  };

  return (
    <div className="form location-search">
      <input
        type="text"
        placeholder="Longitude"
        value={long}
        onChange={(e) => setLong(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Distance"
        value={dist}
        onChange={(e) => setDist(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default LocationSearch;
