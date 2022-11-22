export interface TurfLocation {
  id: string;
  user_id: string;
  created_at: number;
  name: string;
  address: string;
  image_link: string;
}

export interface TurfType {
  id: string;
  location_turf_id: string;
  created_at: number;
  name: string;
  price: number;
  rating: number;
  type: string;
  image_link: string;
}
