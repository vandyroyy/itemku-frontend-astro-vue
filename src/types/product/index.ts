import type { IConfigReducers } from "@/types/config";

export interface IProduct {
  auction_event?: IProductAuction;
  average_delivery_time?: number;
  competitor_price: number;
  discount: number;
  game_id: number;
  game_name: string;
  game_slug?: string;
  grosir: boolean;
  id: number;
  image_url?: string;
  is_antihackback: boolean;
  is_cheaper_than_competitor: boolean;
  is_cheaper_than_market: boolean;
  is_inserted_promotion?: boolean | number;
  is_itemku_partner: boolean;
  item_category_id: number;
  item_info_group_id?: number;
  item_info_group_name?: string;
  item_type?: string;
  item_type_id: number;
  min_order: number;
  name: string;
  order_count: number;
  price: number;
  seller_currency?: string;
  seller_emblem?: ISellerEmblem;
  seller_last_activity_at?: string;
  is_seller_open?: boolean
  seller_profile_picture: string;
  seller_rating?: number
  seller_rating_count?: number
  seo_string: string;
  server_name?: string;
  shop_name?: string;
  stock: number;
  use_ads: boolean;
  use_auto_delivery: boolean;
  use_auto_fulfillment: boolean;
  use_fast_delivery: boolean;
  use_instant_delivery: boolean;
  base_unit?: number;
}

export enum ITEM_TYPE_RISK_TYPE {
  NO_RISK = 0,
  MEDIUM_RISK = 1,
  HIGH_RISK = 2
}

export interface IHackbackChecking {
  configList?: any,
  configReducers?: IConfigReducers,
  itemCategoryId: number,
  riskyTypeId?: number,
  withRiskChecking?: boolean
}

export interface ISellerEmblem {
  category_name: string;
  custom_text: string;
  emblem_image_url: string;
  item_type_ids: string;
}

export interface IProductAuction {
  auction_event_id: number;
  bid_count: number;
  bid_price: number;
  end_date: string;
}