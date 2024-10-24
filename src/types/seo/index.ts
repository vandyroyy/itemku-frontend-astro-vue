export enum SEO_BOTTOM_CONTENT_TYPE {
  GAME_PAGE = 0,
  PRODUCT_LIST = 1,
  TERMURAH_PAGE = 2,
  LANDING_PAGE_GENERATOR = 3,
  HOME_PAGE = 4,
  QUICKBUY = 5
}

export interface ISeoContent {
  id: number;
  game_id: number;
  page_type: number;
  content_json_array: IContentJsonArray[];
  editor_js_content?: string;
}

export interface IContentJsonArray {
  title: string;
  body: string;
  is_accordion?: boolean
}
