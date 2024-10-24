export interface ICurrencySymbol {
  [region_name: string]: string,
}

export interface ICurrencySymbolResponse {
  listSymbol: ICurrencySymbol;
  expireAt: number;
}

export enum CURRENCY_CODE {
  INDONESIA = 'IDR',
  MALAYSIA = 'MYR',
  SINGAPORE = 'SGD',
  PHILIPPINES = 'PHP',
  UNITED_STATES = 'USD',
}

export const LOCALE_ID: Record<string, string> = {
  [CURRENCY_CODE.INDONESIA]: 'id-ID',
  [CURRENCY_CODE.MALAYSIA]: 'en-MY',
  [CURRENCY_CODE.SINGAPORE]: 'en-SG',
  [CURRENCY_CODE.PHILIPPINES]: 'en-PH',
};

export const CURRENCY_DECIMAL_DIGIT: { [key: string]: number } = {
  IDR: 0,
  VND: 0,
  JPY: 0,
  KRW: 0,
  PYG: 0,
  COP: 0,
  ISK: 0,
  CLP: 0,
  HUF: 0,
  IRR: 0,
  IQD: 0,
  LYD: 0,
  MGA: 0,
  RWF: 0,
  TZS: 0,
  UGX: 0,
  UZS: 0,
  VES: 0,
  CRC: 0,
  SGD: 2,
  MYR: 2,
  PHP: 2,
  USD: 2,
  EUR: 2,
  GBP: 2,
  AUD: 2,
  THB: 2,
  OMR: 3,
  BHD: 3,
  TND: 3,
  JOD: 3,
  KWD: 3,
};