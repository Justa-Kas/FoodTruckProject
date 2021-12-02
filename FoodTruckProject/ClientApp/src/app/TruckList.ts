export interface TruckList {
  businesses: FoodTruck[];
  total: number;
  region: Region;
}

export interface FoodTruck {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: Center;
  price: string;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Center {
  latitude: number;
  longitude: number;
}

export interface Location {
  address1: null | string;
  address2: null | string;
  address3: null | string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

export interface Region {
  center: Center;
}
