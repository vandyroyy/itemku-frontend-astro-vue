import type { IPlaceholder } from "@/types/metadata";

export type IDefaultSort = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface IGame {
  banner_image_url: string;
  genre_id?: number;
  icon_image_url: string;
  id: number;
  name: string;
  nickname: string;
  platform_id: number;
  poster_image_url: string;
  seo_string: string;
  slug: string;
  small_icon_image_url: string;
  type_id?: number;
  game_placeholder_image_url?: string;
}

export interface IGameInfo {
  game: {
    game_id: number;
    game_name: string;
    game_slug: string;
    seo_string: string;
    description: string;
    description_translation: string;
    banner_image_url: string;
    game_official_store_id: number;
    banner_official_store_mobile?: IPlaceholder;
    banner_official_store_desktop?: IPlaceholder;
    is_strict_item_info: boolean | number;
    how_to_trade_link?: string;
    og_image_url?: string;
    game_expansion_country: IGameExpansionCountry[] | []
    nickname?: string;
    poster_image_url?: string;
  };
  genre?: {
    id: number,
    name: string,
    slug: string
  },
  has_game_page: boolean | number;
  has_server: boolean | number;
  has_vendor_product: null;
  item_type: Array<IGameInfoItemType>;
  promotion_banner: string;
  quickbuy_id: null;
  server: Array<IGameInfoServer>;
  server_label?: string;
}

export interface IGameExpansionCountry {
  country_code: string;
  game_id: number;
  id: number;
  is_active: number;
}

export interface IGameInfoServer {
  id: number;
  name: string;
}

export interface IGameInfoItemType {
  can_use_cheap_than_market: boolean;
  can_use_wholesale: boolean;
  default_sort: IDefaultSort;
  game_id: number;
  game_name: string;
  game_slug: string;
  has_auto_delivery: boolean;
  has_instant_delivery: boolean;
  has_quickbuy_page: boolean;
  icon_image_url: string;
  id: number;
  is_auction_eligible: number;
  is_fast_delivery_eligible: boolean;
  is_sharing_account_eligible: boolean
  item_category_id: number;
  item_info: Array<IGameInfoItemInfo>;
  item_info_group: Array<IGameInfoItemInfoGroup>;
  name: string;
  risky_type_id: number
  slug: string;
  translation_value?: string;
  use_new_catalog_design: boolean;
  quick_filter_config?: string;
  item_info_group_label?: string;
  item_info_label?: string;
}

export interface IGameInfoItemInfo {
  id: number;
  is_highest_sales?: boolean;
  name: string;
  slug?: string;
}

export interface IGameInfoItemInfoGroup {
  has_cheapest_product?: boolean
  id: number;
  item_info: Array<IGameInfoItemInfo>;
  name: string;
  slug: string;
}

export interface IRawGame {
  id: number;
  name: string;
  slug: string;
}
