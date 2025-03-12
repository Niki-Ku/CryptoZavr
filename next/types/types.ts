export interface Image {
  url: string;
  alternativeText: string;
}

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
}
