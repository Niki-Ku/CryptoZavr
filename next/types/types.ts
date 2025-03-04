export interface Category {
  name: string;
}

export interface Image {
  url: string;
  alternativeText: string;
}

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  categories: Category[]
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  plans: any[];
  perks: any[];
  featured?: boolean;
  images: any[];
  categories?: any[];
};

export interface ILink {
	id: number;
	url: string;
	text: string;
	isExternal: boolean;
}

export interface RegisterUserProps {
  password: string;
  username: string;
  email: string;
}

export interface LoginUserProps {
  identifier: string;
  password: string;
}