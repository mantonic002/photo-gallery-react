import React, { useEffect, useState } from "react";
import DataList from "./components/DataList";
import {
  deletePhoto,
  deletePhotos,
  fetchPhotos,
  searchPhotos,
  TextSearchLocation,
} from "./api/api";
import { Photo } from "./models/DataModel";
import LocationSearch from "./components/LocationSearch";
import "./App.css";

function App() {
  const [data, setData] = useState<Photo[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    restartData();
  }, []);

  const restartData = () => {
    setData([]);
    getPhotos();
  };

  const getPhotos = async (lastId?: string, limit?: number) => {
    await fetchPhotos(lastId, limit)
      .then((res) => {
        setData(data.concat(res));
        return res;
      })
      .catch((err) => {
        console.error(err);
        setErr("Error fetching photos");
        return [];
      });
  };

  const onSearchPhotos = async ({
    query,
    dist,
  }: {
    query: string;
    dist: string;
  }) => {
    await TextSearchLocation(query)
      .then((res) => {
        if (res.length === 0) {
          setErr("No location found");
          return [];
        }
        const { lon, lat } = res[0];
        return searchPhotos(lon, lat, dist);
      })
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((err) => {
        console.error(err);
        setErr("Error searching photos");
        return [];
      });
  };

  const handleDeletePhoto = (id: string) => {
    deletePhoto(id)
      .then(() => {
        setData(data.filter((photo) => photo.ID !== id));
      })
      .catch((err) => {
        console.error(err);
        setErr("Error deleting photo");
      });
  };

  const handleDeletePhotos = (ids: string[]) => {
    deletePhotos(ids)
      .then(() => {
        setData(data.filter((photo) => !ids.includes(photo.ID)));
      })
      .catch((err) => {
        console.error(err);
        setErr("Error deleting photos");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <h3>Photo Gallery</h3>
          </li>
          <li>
            <LocationSearch onSearch={onSearchPhotos} />
          </li>
        </ul>
      </header>
      <main className="App-main">
        <DataList
          data={data}
          loadMore={getPhotos}
          deletePhoto={handleDeletePhoto}
          deletePhotos={handleDeletePhotos}
        />
        <button
          onClick={() =>
            getPhotos(data.length ? data[data.length - 1].ID : undefined, 10)
          }
        >
          Load More
        </button>

        {err && <div className="error">{err}</div>}
      </main>
    </div>
  );
}

export default App;
