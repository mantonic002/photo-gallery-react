// src/components/LocationSearch.tsx
import { useState } from "react";

interface LocationSearchProps {
  onSearch: (query: string, dist: string) => Promise<void>;
}

function LocationSearch({ onSearch }: LocationSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [dist, setDist] = useState<string>("");

  const handleSearch = () => {
    if (query.trim() && dist.trim()) {
      onSearch(query.trim(), dist.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() && dist.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="form location-search">
      <input
        type="text"
        placeholder="Enter location (e.g., New York)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <input
        type="number"
        placeholder="Distance (meters)"
        value={dist}
        onChange={(e) => setDist(e.target.value)}
        onKeyDown={handleKeyPress}
        min="0"
      />
      <button onClick={handleSearch} disabled={!query.trim() || !dist.trim()}>
        Search
      </button>
    </div>
  );
}

export default LocationSearch;
