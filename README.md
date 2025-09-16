# Photo Backup App (Frontend)

A React frontend for the Photo Backup App, a self-hosted alternative to Google Photos. Integrates with the [Go backend](https://github.com/mantonic002/photo-backup) to manage photo uploads, viewing, geolocation search, and deletion.

## Features

- **Photo Gallery**: Displays thumbnails grouped by date.
- **Pagination**: Paginates photos with a "Load More" button (infinite scroll not yet implemented).
- **Full-Screen Slider**: View photos with navigation and deletion.
- **Geolocation Search**: Find photos by location and distance.
- **Bulk Deletion**: Select and delete multiple photos.

## Prerequisites

- **Node.js**
- **Backend**: Running Photo Backup App backend (see [backend README](https://github.com/mantonic002/photo-backup)).
- **Dependencies**: `react`, `react-dom`, `react-icons`, `axios`.

## Setup

1. **Clone Repository**:

   ```bash
   git clone https://github.com/mantonic002/photo-gallery-react.git
   cd photo-backup-react
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment**:
   Edit `.env`:

   ```plaintext
    REACT_APP_API_URL=http://localhost:8080
    REACT_APP_OSM_API_URL=https://nominatim.openstreetmap.org/search
   ```

4. **Run**:

   ```bash
   npm run dev
   ```

   Access at `http://localhost:3000`.

5. **Ensure Backend**: Backend must run at `REACT_APP_API_URL`.

## Project Structure

- `src/App.tsx`: Main component for state and API calls.
- `src/components/DataList.tsx`: Lists photos by date.
- `src/components/DataItem.tsx`: Renders photo thumbnails.
- `src/components/FullScreenImageSlider.tsx`: Full-screen photo slider.
- `src/components/LocationSearch.tsx`: Location search form.
- `src/api/api.ts`: API functions for backend interaction.
- `src/models/DataModel.ts`: `Photo` interface.

## Usage

- **View Photos**: Loads photos grouped by date; click "Load More" for more.
- **Full-Screen View**: Click a thumbnail to view, navigate, or delete.
- **Search**: Enter location and distance to find photos.
- **Delete**: Select photos with checkmarks; delete with trash button.

## API Integration

- Nominatim public API for text to coordinates conversion
- See [backend repo](https://github.com/mantonic002/photo-backup)

## Notes

- **Infinite Scroll**: Not implemented; "Load More" button used instead.
- **Auth**: Not implemented yet.

## Backend

See [backend README](https://github.com/mantonic002/photo-backup) for setup.
