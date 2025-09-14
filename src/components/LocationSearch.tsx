import { useState } from "react";

interface LocationSearchProps {
  onSearch: (params: { query: string; dist: string }) => void;
}

function LocationSearch({ onSearch }: LocationSearchProps) {
  const [query, setQuery] = useState<string | "">("");
  const [dist, setDist] = useState<string | "">("");

  const handleSearch = () => {
    onSearch({ query, dist });
  };

  return (
    <div className="form location-search">
      <input
        type="text"
        placeholder="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Distance(meters)"
        value={dist}
        onChange={(e) => setDist(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default LocationSearch;
