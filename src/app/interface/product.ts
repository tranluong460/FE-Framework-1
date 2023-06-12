export interface IProduct {
  _id: string;
  name: string;
  price: number;
  original_price: number;
  short_description: string;
  description: string;
  images: IImage[];
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
  specifications: ISpecification;
}

export interface IImage {
  base_url: string;
  is_gallery: boolean;
  label: null | string;
  large_url: string;
  medium_url: string;
  position: null | number;
  small_url: string;
  thumbnail_url: string;
}

export interface ISpecification {
  name: string;
  attributes: {
    code: string;
    value: string;
    name: string;
  }[];
}
