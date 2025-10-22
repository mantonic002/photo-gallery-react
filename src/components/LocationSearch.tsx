// src/components/LocationSearch.tsx
import { useState } from "react";

interface LocationSearchProps {
  onSearch: (query: string) => Promise<void>;
}

function LocationSearch({ onSearch }: LocationSearchProps) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
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
      <button onClick={handleSearch} disabled={!query.trim()}>
        Search
      </button>
    </div>
  );
}

export default LocationSearch;
