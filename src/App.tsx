import { PhotoProvider } from "./contexts/PhotoContext";
import DataList from "./components/DataList";
import LocationSearch from "./components/LocationSearch";
import { usePhotoSearch } from "./hooks/usePhotoSearch";
import "./App.css";

function App() {
  const { searchParams, handleSearch, resetSearch } = usePhotoSearch();

  return (
    <PhotoProvider searchParams={searchParams}>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <h3>Photo Gallery</h3>
            </li>
            <li>
              <LocationSearch onSearch={handleSearch} />
              <button onClick={resetSearch}>Clear Search</button>
            </li>
          </ul>
        </header>
        <main className="App-main">
          <DataList />
        </main>
      </div>
    </PhotoProvider>
  );
}

export default App;
