import type { IProduct } from "@/types/product";
import type { IRegionData } from "@/types/region";
import type { ICurrencySymbol } from "@/types/currency";
import type { IApiForeignExchangeRate } from "@/types/foreign-exchange";
import type { IGameInfo, IGameInfoItemType } from "@/types/game";
import type { ISeoContent } from "@/types/seo";
import type { IConfigReducers } from "@/types/config";

export interface ILandingPageProps {
  landingPage?: ILandingPageData;
  products: IProduct[];
  gameInfo?: IGameInfo;
  productsPage?: number;
  productsPerPage?: number;
  productsAllCount?: number;
  isBot?: boolean;
  languageCode?: string;
  countryCode?: string;
  seoBottomContent?: ISeoContent;
  exchangeRate?: IApiForeignExchangeRate;
  regionData?: IRegionData;
  isUsingNewSeoPage?: boolean;
  currencySymbol?: ICurrencySymbol;
  seoParams?: { [key: string]: string; };
  maxSellerRating: number;
  countSellerRating: number;
  relatedItemTypePageLinks: ILandingPaageLink[];
  relatedItemInfoPageLinks: ILandingPaageLink[];
  relatedGameIDPageLinks: ILandingPaageLink[];
  itemType?: IGameInfoItemType;
  priceInfos: IPriceList[];
  configReducersReplica?: IConfigReducers;
  isMobile: boolean;
}

export interface ILandingPageData {
  id: number;
  uri: string;
  meta_title: string;
  meta_description: string;
  header_text: string;
  game_id: number;
  item_type_id: number;
  item_info_id: number;
  type: number;
  search_condition_json: any;
}

export interface ILandingPaageLink { 
  name: string; 
  href: string;
}

export interface IPriceList {
  name: string;
  price: number;
}