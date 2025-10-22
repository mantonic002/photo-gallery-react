import { PhotoProvider } from "./contexts/PhotoContext";
import DataList from "./components/DataList";
import LocationSearch from "./components/LocationSearch";
import { usePhotoSearch } from "./hooks/usePhotoSearch";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

function App() {
  const { searchParams, handleSearch, resetSearch } = usePhotoSearch();
  const { loggedIn, login } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      const userInput = window.prompt("password");
      if (userInput !== null) {
        login(userInput);
      }
    }
  }, [loggedIn]);

  return (
    <PhotoProvider searchParams={searchParams}>
      <div className="App">
        {loggedIn && (
          <>
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
          </>
        )}
      </div>
    </PhotoProvider>
  );
}

export default App;
