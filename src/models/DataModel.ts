export interface LonLat {
  Type: string;
  Coordinates: [number, number];
}

export interface Photo {
  ID: string;
  LonLat: LonLat;
  TakenAt: string;
  FilePath: string;
  ThumbnailPath: string;
  Metadata: any;
  Size: number;
  ContentType: string;
}

export interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  boundingbox: string[]; // [latMin, latMax, longMin, longMax]
  display_name: string;
}
