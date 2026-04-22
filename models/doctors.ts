export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  reviews: number;
  price: string;
  exp: string;
  patients: string;
  location: string; // Used for quick display on cards
  address: string; // Detailed street address
  hospital: string; // Associated hospital/clinic
  about: string; // Bio text
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image: any;
}
