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
<<<<<<< Updated upstream
=======
}

export interface ITerms {
  id: string;
  subheading: string;
  termsText: ITermsText[];
}

export interface ITermsText {
  type: string;
  children: ITextChildren[];
}

export interface ITextChildren {
  type: string;
  text: string;
}

export interface INetwork {
  id: string;
  name: string;
  rpcUrl: string;
  coingeckoId: string;
}

export interface IWallet {
  address: string;
  privateKey: string;
  signinKey: string;
}

export interface ICoingeckoCoinResponse {
  image: {
    large: string;
    small: string;
    thumb: string;
  }
  market_data: {
    current_price: {
      usd: number;
    }
  }
>>>>>>> Stashed changes
}