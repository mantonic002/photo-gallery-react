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
