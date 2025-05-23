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
  networkId: string;
  networkName: string;
  rpcUrl: string;
  coingeckoId: string;
}

export interface IWallet {
  address: string;
  privateKey: string;
  signinKey: string;
}

export interface ICoingeckoCoinResponse {
  image: string;
  name: string;
  symbol: string;
  id: string;
  current_price: number;
}

export type INetworkAndGeckoResponse = INetwork & Partial<ICoingeckoCoinResponse>;

export interface IMnemonicPhraseInput {
	isVisible: boolean;
	value: string;
}

export interface IIndexedDBRecord {
	name: string;
	data: string;
	isIconClicked: boolean;
	id: string;
}