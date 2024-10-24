export interface IConfigReducers {
  configList: Record<string, any>;
  constant: Record<string, any>;
  configByFeature: Record<string, any | undefined>;
  lastUpdate: number;
  ACCOUNT_CATEGORY_ID?: number;
  TOPUP_LOGIN_CATEGORY_ID?: number;
  JOKI_ITEM_CATEGORY_ID?: number;
}
