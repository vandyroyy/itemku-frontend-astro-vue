import { CURRENCY_CODE, CURRENCY_DECIMAL_DIGIT, LOCALE_ID, type ICurrencySymbol } from "@/types/currency";
import type { IApiForeignExchangeRate } from "@/types/foreign-exchange";
import { REGION_CODE, type IRegionData } from "@/types/region";

// please call after lifecycle
export const isMobileOrTablet = () => {
  let check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        a.slice(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || (window as any).opera)
  return check
}

export const isUserAgentMobile = (useragent: string) => {
  return /(android|iphone|ipad|mobile)/i.test(useragent);
}

export const forceHttps = (value: string) => {
  let result = value;

  if (result != null) {
    result = result.replace(/(^\w+:|^)\/\//, '');
    result = 'https://' + result;
  }
  return result;
};

export function forceHttp(itemImageURL: string, value: string) {
  if (itemImageURL && itemImageURL.slice(0, 4) === 'http') {
    return itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 2) === '//') {
    return 'http:' + itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 1) === '/') {
    return itemImageURL;
  }
  return value;
}

export const replaceUndefinedPropsToNull = <T>(object: { [key: string]: any }) => {
  if (!object || typeof object !== 'object') return object;
  for (const key in object) {
    if (object[key] === undefined) object[key] = null;
  }
  return object as T;
};

export const convertToSlug = (str: string) => {
  if (typeof str !== 'string') return str;
  const slug = str
    .toLowerCase()
  // Convert all underscores into -
    .replace(/_/g, ' ')
  // Remove all characters that are not  -, letters, numbers, or whitespace.
    .replace(/[^\w\s-]+/g, '')
  // Convert all white space into single space
    .replace(/\s+/g, ' ')
    .trim()
  // Convert all white space to -
    .replace(/ /g, '-');

  return removeMultiDashSlug(slug);
}

const removeMultiDashSlug = (str: string) => {
  if (typeof str !== 'string') return str;
  const lowerCaseStr = str || '';
  const regex = /(-){2,}/g;
  return lowerCaseStr.replace(regex, '-');
}

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex],
    ];
  }

  return array;
};

export const mapCurrencySymbol = (currencySymbolList: ICurrencySymbol | undefined, regionCurrency: string | undefined): string | undefined => {
  var symbol = undefined;
  if (currencySymbolList && regionCurrency) {
    const selectedCurrencySymbol = currencySymbolList[regionCurrency];
    if (selectedCurrencySymbol) {
      symbol = selectedCurrencySymbol;
    }
  }
  return symbol;
};

export const currencyHelper = (
  foreignExchangeRate: IApiForeignExchangeRate | undefined,
  region: IRegionData | undefined,
  amount: number | undefined,
  currencySymbol?: string,
  isConverted: boolean = false,
): string => {
  if (amount == null || amount == undefined || !foreignExchangeRate?.exchange_rate || !region) { return ''; }
  if ((region.country_code == REGION_CODE.INDONESIA) || foreignExchangeRate.source_currency == 'IDR' && foreignExchangeRate.target_currency == 'IDR') {
    return amount < 0 ? `- Rp${Math.abs(amount).toLocaleString()}` : `Rp${amount.toLocaleString()}`;
  }
  const locale = region ? localeMapperForCurrency(region.default_locale_id || LOCALE_ID[CURRENCY_CODE.INDONESIA]) : 'id-ID';

  let convertedAmounts = !isConverted ? exchangeRateConversionHelper(foreignExchangeRate, region, amount) : amount;

  if (currencySymbol) {
    const price = new Intl.NumberFormat(locale, { minimumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency] }).format(convertedAmounts);
    return `${currencySymbol} ${price}`;
  }

  // eslint-disable-next-line @babel/new-cap
  const formater = Intl.NumberFormat(locale, {
    style: 'currency',
    currency: foreignExchangeRate.source_currency,
    minimumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency],
    maximumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency],
  });
  return formater.format(convertedAmounts);
};

export const localeMapperForCurrency = (locale: string) => {
  switch (locale) {
    case LOCALE_ID[CURRENCY_CODE.INDONESIA]:
    case 'id-ID':
    case LOCALE_ID[CURRENCY_CODE.MALAYSIA]:
    case 'en-MY':
    case LOCALE_ID[CURRENCY_CODE.SINGAPORE]:
    case 'en-SG':
    case LOCALE_ID[CURRENCY_CODE.PHILIPPINES]:
    case 'en-PH':
      return locale;
    default:
      return LOCALE_ID[CURRENCY_CODE.SINGAPORE];
  }
};

export const exchangeRateConversionHelper = (foreignExchangeRate: IApiForeignExchangeRate | any, region: IRegionData | any, amount: number): number => {
  if (!amount || !foreignExchangeRate?.exchange_rate || amount <= 0) { return 0; }
  if ((region?.country_code == REGION_CODE.INDONESIA) || foreignExchangeRate.source_currency == 'IDR' && foreignExchangeRate.target_currency == 'IDR') {
    return amount;
  }
  const locale = region ? region.default_locale_id : 'id-ID';
  // eslint-disable-next-line @babel/new-cap
  const formater = Intl.NumberFormat(locale, {
    minimumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency],
    maximumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency],
  });
  const formatted = formater.format((amount / foreignExchangeRate.exchange_rate));
  return reverseIntlFormat(formatted, locale);
};

const reverseIntlFormat = (value: string, locale: string) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  const group = parts.find((part) => part.type === 'group')?.value;
  const decimal = parts.find((part) => part.type === 'decimal')?.value;
  const reversedVal = Number(
    value.replace(new RegExp('\\' + group, 'g'), '').replace(new RegExp('\\' + decimal, 'g'), '.')
  );

  return Number.isNaN(reversedVal) ? 0 : reversedVal;
};