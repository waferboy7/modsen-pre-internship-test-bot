export interface RecFeatuers {
  id: string;
  geometry: {
    coordinates: number[];
  };
  properties: {
    name: string;
    rate: number;
    dist: number;
  };
}

export interface RecResponce {
  type: string;
  features: RecFeatuers[];
}
