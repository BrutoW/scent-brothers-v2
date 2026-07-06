export interface Perfume {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface PerfumeCollection {
  new: Perfume[];
  trending: Perfume[];
  luxury: Perfume[];
  catalogo: Perfume[];
}