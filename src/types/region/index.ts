export enum REGION_CODE {
  INDONESIA = 'ID',
  UNITED_STATES = 'US',
}

export enum LANGUAGE_CODE {
  ID = 'id',
  EN = 'en',
}
export enum DEFAULT_LOCALE_CODE{
  INDONESIA = 'id-id',
  UNITED_STATES = 'en-us'
}

export interface IRegionData {
  country_calling_code?: string;
  country_code?: string;
  country_currency?: string;
  country_image_url?: string;
  country_name?: string;
  country_timezone?: string;
  default_language_code?: string;
  default_locale_id?: string;
  is_active?: number;
  label?: string;
  region_id?: number;
  supported_language_codes?: string[];
  supported_language_codes_detail?: {language_code: string, language_name: string}[];
}