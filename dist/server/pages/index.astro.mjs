/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent, b as createAstro } from '../chunks/astro/server_clUIigNo.mjs';
import 'kleur/colors';
import sha3 from 'crypto-js/sha3.js';
import Base64 from 'crypto-js/enc-base64.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import { useSSRContext, defineComponent, toRefs, mergeProps, ref, onMounted } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
export { renderers } from '../renderers.mjs';

const createHmacDigest = (nonce, message, path, privateKey) => {
  const jsonData = JSON.stringify(message).replace(/\\r/g, "");
  const hashDigest = sha3(nonce + jsonData);
  const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
  return hmacDigest;
};
class ApiHelper {
  static clientId = "frontend_server";
  static baseURL = "https://internal-gateway.itemku.com";
  static createHmacKey(endpoint, params, nonce = (/* @__PURE__ */ new Date()).getTime()) {
    const hmacDigest = createHmacDigest(nonce.toString(), params, endpoint, "frontend_server");
    return hmacDigest;
  }
  static objectToQueryString(params) {
    if (!params) return "";
    return Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return `${encodeURIComponent(key)}=`;
        }
        return value.map((item) => `${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`).join("&");
      }
      if (value) return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    }).join("&");
  }
  // GET
  // const params = new URLSearchParams({
  //   results: '5',
  //   gender: 'female'
  // });
  // const response = await fetch(`https://randomuser.me/api/?${params}`);
  static async get(url, params) {
    try {
      const nonce = (/* @__PURE__ */ new Date()).getTime();
      const hmacDigest = ApiHelper.createHmacKey(url.replace(ApiHelper.baseURL, ""), {}, nonce);
      const headers = {
        "Client-ID": ApiHelper.clientId,
        Nonce: nonce,
        "X-Itemku-Content": hmacDigest
      };
      const formattedParams = ApiHelper.objectToQueryString(params);
      const result = await fetch(`${ApiHelper.baseURL}${url}?${formattedParams}`, {
        headers
      });
      return result.json();
    } catch (error) {
      return console.log("error", `Error on url: ${url}, ${error}`);
    }
  }
  // POST
  // const params = {
  //   results: 5,
  //   gender: 'female'
  // };
  // const response = await fetch('https://randomuser.me/api/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(params)
  // });
}

var ITEM_TYPE_RISK_TYPE = /* @__PURE__ */ ((ITEM_TYPE_RISK_TYPE2) => {
  ITEM_TYPE_RISK_TYPE2[ITEM_TYPE_RISK_TYPE2["NO_RISK"] = 0] = "NO_RISK";
  ITEM_TYPE_RISK_TYPE2[ITEM_TYPE_RISK_TYPE2["MEDIUM_RISK"] = 1] = "MEDIUM_RISK";
  ITEM_TYPE_RISK_TYPE2[ITEM_TYPE_RISK_TYPE2["HIGH_RISK"] = 2] = "HIGH_RISK";
  return ITEM_TYPE_RISK_TYPE2;
})(ITEM_TYPE_RISK_TYPE || {});

var REGION_CODE = /* @__PURE__ */ ((REGION_CODE2) => {
  REGION_CODE2["INDONESIA"] = "ID";
  REGION_CODE2["UNITED_STATES"] = "US";
  return REGION_CODE2;
})(REGION_CODE || {});
var LANGUAGE_CODE = /* @__PURE__ */ ((LANGUAGE_CODE2) => {
  LANGUAGE_CODE2["ID"] = "id";
  LANGUAGE_CODE2["EN"] = "en";
  return LANGUAGE_CODE2;
})(LANGUAGE_CODE || {});
var DEFAULT_LOCALE_CODE = /* @__PURE__ */ ((DEFAULT_LOCALE_CODE2) => {
  DEFAULT_LOCALE_CODE2["INDONESIA"] = "id-id";
  DEFAULT_LOCALE_CODE2["UNITED_STATES"] = "en-us";
  return DEFAULT_LOCALE_CODE2;
})(DEFAULT_LOCALE_CODE || {});

var CURRENCY_CODE = /* @__PURE__ */ ((CURRENCY_CODE2) => {
  CURRENCY_CODE2["INDONESIA"] = "IDR";
  CURRENCY_CODE2["MALAYSIA"] = "MYR";
  CURRENCY_CODE2["SINGAPORE"] = "SGD";
  CURRENCY_CODE2["PHILIPPINES"] = "PHP";
  CURRENCY_CODE2["UNITED_STATES"] = "USD";
  return CURRENCY_CODE2;
})(CURRENCY_CODE || {});
const LOCALE_ID = {
  ["IDR" /* INDONESIA */]: "id-ID",
  ["MYR" /* MALAYSIA */]: "en-MY",
  ["SGD" /* SINGAPORE */]: "en-SG",
  ["PHP" /* PHILIPPINES */]: "en-PH"
};
const CURRENCY_DECIMAL_DIGIT = {
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
  KWD: 3
};

const isMobileOrTablet = () => {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      a.slice(0, 4)
    ))
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
const isUserAgentMobile = (useragent) => {
  return /(android|iphone|ipad|mobile)/i.test(useragent);
};
const forceHttps = (value) => {
  let result = value;
  if (result != null) {
    result = result.replace(/(^\w+:|^)\/\//, "");
    result = "https://" + result;
  }
  return result;
};
function forceHttp(itemImageURL, value) {
  if (itemImageURL && itemImageURL.slice(0, 4) === "http") {
    return itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 2) === "//") {
    return "http:" + itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 1) === "/") {
    return itemImageURL;
  }
  return value;
}
const replaceUndefinedPropsToNull = (object) => {
  if (!object || typeof object !== "object") return object;
  for (const key in object) {
    if (object[key] === void 0) object[key] = null;
  }
  return object;
};
const convertToSlug = (str) => {
  if (typeof str !== "string") return str;
  const slug = str.toLowerCase().replace(/_/g, " ").replace(/[^\w\s-]+/g, "").replace(/\s+/g, " ").trim().replace(/ /g, "-");
  return removeMultiDashSlug(slug);
};
const removeMultiDashSlug = (str) => {
  if (typeof str !== "string") return str;
  const lowerCaseStr = str || "";
  const regex = /(-){2,}/g;
  return lowerCaseStr.replace(regex, "-");
};
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
};
const mapCurrencySymbol = (currencySymbolList, regionCurrency) => {
  var symbol = void 0;
  if (currencySymbolList && regionCurrency) {
    const selectedCurrencySymbol = currencySymbolList[regionCurrency];
    if (selectedCurrencySymbol) {
      symbol = selectedCurrencySymbol;
    }
  }
  return symbol;
};
const currencyHelper = (foreignExchangeRate, region, amount, currencySymbol, isConverted = false) => {
  if (amount == null || amount == void 0 || !foreignExchangeRate?.exchange_rate || !region) {
    return "";
  }
  if (region.country_code == REGION_CODE.INDONESIA || foreignExchangeRate.source_currency == "IDR" && foreignExchangeRate.target_currency == "IDR") {
    return amount < 0 ? `- Rp${Math.abs(amount).toLocaleString()}` : `Rp${amount.toLocaleString()}`;
  }
  const locale = region ? localeMapperForCurrency(region.default_locale_id || LOCALE_ID[CURRENCY_CODE.INDONESIA]) : "id-ID";
  let convertedAmounts = !isConverted ? exchangeRateConversionHelper(foreignExchangeRate, region, amount) : amount;
  if (currencySymbol) {
    const price = new Intl.NumberFormat(locale, { minimumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency] }).format(convertedAmounts);
    return `${currencySymbol} ${price}`;
  }
  const formater = Intl.NumberFormat(locale, {
    style: "currency",
    currency: foreignExchangeRate.source_currency,
    minimumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency],
    maximumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency]
  });
  return formater.format(convertedAmounts);
};
const localeMapperForCurrency = (locale) => {
  switch (locale) {
    case LOCALE_ID[CURRENCY_CODE.INDONESIA]:
    case "id-ID":
    case LOCALE_ID[CURRENCY_CODE.MALAYSIA]:
    case "en-MY":
    case LOCALE_ID[CURRENCY_CODE.SINGAPORE]:
    case "en-SG":
    case LOCALE_ID[CURRENCY_CODE.PHILIPPINES]:
    case "en-PH":
      return locale;
    default:
      return LOCALE_ID[CURRENCY_CODE.SINGAPORE];
  }
};
const exchangeRateConversionHelper = (foreignExchangeRate, region, amount) => {
  if (!amount || !foreignExchangeRate?.exchange_rate || amount <= 0) {
    return 0;
  }
  if (region?.country_code == REGION_CODE.INDONESIA || foreignExchangeRate.source_currency == "IDR" && foreignExchangeRate.target_currency == "IDR") {
    return amount;
  }
  const locale = region ? region.default_locale_id : "id-ID";
  const formater = Intl.NumberFormat(locale, {
    minimumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency],
    maximumFractionDigits: CURRENCY_DECIMAL_DIGIT[foreignExchangeRate.source_currency]
  });
  const formatted = formater.format(amount / foreignExchangeRate.exchange_rate);
  return reverseIntlFormat(formatted, locale);
};
const reverseIntlFormat = (value, locale) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1111.1);
  const group = parts.find((part) => part.type === "group")?.value;
  const decimal = parts.find((part) => part.type === "decimal")?.value;
  const reversedVal = Number(
    value.replace(new RegExp("\\" + group, "g"), "").replace(new RegExp("\\" + decimal, "g"), ".")
  );
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
};

const productListHelper = (data, configReducers = void 0, countryCode = REGION_CODE.INDONESIA) => {
  const defaultImageList = configReducers ? JSON.parse(configReducers.configList.DEFAULT_IMAGE_GLOBAL) : [];
  const c2cHiddenGameIDs = configReducers ? JSON.parse(configReducers.configList.C2C_HIDDEN_GAME_IDS) : [];
  const forceGenshinDefaultImage = configReducers ? configReducers.configList.FORCE_GENSHIN_DEFAULT_IMAGE : "";
  return data?.filter((item) => {
    if (configReducers !== void 0) {
      return c2cHiddenGameIDs.indexOf(item.game_id) == -1;
    }
    return true;
  }).map(
    (item) => {
      const productImage = item.images && item.images.length > 0 && item.images[0].image_url ? forceHttps(item.images[0].image_url) : null;
      const thumbImage = item.images && item.images.length > 0 && item.images[0].thumbnail_image_url ? forceHttps(item.images[0].thumbnail_image_url) : null;
      const normalImage = thumbImage || productImage || "";
      const product = {
        name: item.name,
        seo_string: item.seo_string,
        game_name: item.game ? item.game.name : "",
        game_id: item.game_id ? item.game_id : void 0,
        game_slug: item.game?.slug || "",
        image_url: countryCode && forceGenshinDefaultImage && (item.game_id == 217 || item.game?.name == "Genshin Impact") ? defaultImageList[String(item.item_type_id)] || normalImage : normalImage,
        id: item.id,
        price: item.price,
        competitor_price: item.competitor_price,
        discount: item.competitor_price && item.competitor_price > item.price ? (item.competitor_price - item.price) / item.competitor_price * 100 : 0,
        is_cheaper_than_competitor: !!(item.competitor_price && item.competitor_price > item.price),
        grosir: item.wholesale ? item.wholesale.length > 0 : false,
        min_order: item.min_order,
        order_count: item.order_record ? item.order_record.successful_order_count : 0,
        use_fast_delivery: Boolean(Number(item.use_fast_delivery)),
        use_auto_delivery: Boolean(Number(item.use_auto_delivery)),
        use_auto_fulfillment: Boolean(Number(item.use_auto_fulfillment)),
        use_instant_delivery: Boolean(Number(item.use_instant_delivery)),
        is_cheaper_than_market: !!(item.market_price && item.market_price > item.price),
        is_antihackback: false,
        item_category_id: item.item_type ? item.item_type.item_category_id : null,
        item_info_group_name: item.item_info_group?.name ? item.item_info_group.name : null,
        item_info_group_id: item.item_info_group_id ? item.item_info_group_id : null,
        item_type: item.item_type?.name && item.item_type.name.length > 0 ? item.item_type.name : null,
        item_type_id: item.item_type_id,
        server_name: item.server_name && item.server_name.length > 0 ? item.server_name : null,
        stock: item.stock,
        use_ads: !!item.use_ads,
        seller_emblem: item.seller_emblem,
        seller_last_activity_at: item.seller?.last_activity_at ? item.seller.last_activity_at : null,
        is_seller_open: !!item.seller?.is_open,
        is_inserted_promotion: !!item.is_inserted_promotion,
        shop_name: item.seller?.shop_name ? item.seller?.shop_name : null,
        average_delivery_time: item.average_delivery_time,
        seller_rating: Math.floor(item?.seller?.average_rating * 10) / 10 || 0,
        seller_rating_count: item.seller.rating_count ? item.seller.rating_count : 0,
        seller_profile_picture: item.seller.profile_picture_url ? item.seller.profile_picture_url : "",
        is_itemku_partner: false,
        // currently disabled this feature and replace it with anti hackback
        auction_event: item.auction_event,
        base_unit: item.base_unit ? item.base_unit : void 0
      };
      if (configReducers !== void 0) {
        product.is_antihackback = isAntiHackback({
          configReducers,
          configList: configReducers?.configList,
          itemCategoryId: product.item_category_id,
          withRiskChecking: true,
          riskyTypeId: item.item_type?.risky_type_id
        });
      }
      return product;
    }
  );
};
const isAntiHackback = (params) => {
  const accountCategoryId = params.configList?.ACCOUNT_CATEGORY_ID ?? params.configReducers?.ACCOUNT_CATEGORY_ID;
  const topupLoginCategoryId = params.configList?.TOPUP_LOGIN_CATEGORY_ID ?? params.configReducers?.TOPUP_LOGIN_CATEGORY_ID;
  const boostingCategoryId = params.configList?.JOKI_ITEM_CATEGORY_ID ?? params.configReducers?.JOKI_ITEM_CATEGORY_ID;
  const isAccountType = accountCategoryId === params.itemCategoryId && (params.withRiskChecking ? params.riskyTypeId == ITEM_TYPE_RISK_TYPE.HIGH_RISK : true);
  const isTopupLoginType = topupLoginCategoryId === params.itemCategoryId;
  const isBoostingType = boostingCategoryId === params.itemCategoryId;
  const conditions = isAccountType || isTopupLoginType || isBoostingType;
  return conditions;
};

const gameInfoHelper = (data, options) => {
  const gameInfo = data;
  gameInfo.game.game_slug = gameInfo.game.game_slug || convertToSlug(gameInfo.game.game_name);
  for (const itemType of gameInfo.item_type) {
    itemType.slug = convertToSlug(itemType.name);
    for (const itemGroup of itemType.item_info_group) {
      itemGroup.slug = convertToSlug(itemGroup.name);
    }
  }
  {
    gameInfo.item_type = gameInfo.item_type.filter((value) => value.is_sharing_account_eligible == false);
  }
  return gameInfo;
};

var SEO_BOTTOM_CONTENT_TYPE = /* @__PURE__ */ ((SEO_BOTTOM_CONTENT_TYPE2) => {
  SEO_BOTTOM_CONTENT_TYPE2[SEO_BOTTOM_CONTENT_TYPE2["GAME_PAGE"] = 0] = "GAME_PAGE";
  SEO_BOTTOM_CONTENT_TYPE2[SEO_BOTTOM_CONTENT_TYPE2["PRODUCT_LIST"] = 1] = "PRODUCT_LIST";
  SEO_BOTTOM_CONTENT_TYPE2[SEO_BOTTOM_CONTENT_TYPE2["TERMURAH_PAGE"] = 2] = "TERMURAH_PAGE";
  SEO_BOTTOM_CONTENT_TYPE2[SEO_BOTTOM_CONTENT_TYPE2["LANDING_PAGE_GENERATOR"] = 3] = "LANDING_PAGE_GENERATOR";
  SEO_BOTTOM_CONTENT_TYPE2[SEO_BOTTOM_CONTENT_TYPE2["HOME_PAGE"] = 4] = "HOME_PAGE";
  SEO_BOTTOM_CONTENT_TYPE2[SEO_BOTTOM_CONTENT_TYPE2["QUICKBUY"] = 5] = "QUICKBUY";
  return SEO_BOTTOM_CONTENT_TYPE2;
})(SEO_BOTTOM_CONTENT_TYPE || {});

const MONTH_NAME = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
  props: {
    list: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { list } = toRefs(props);
    const __returned__ = { props, list };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row space-x-3" }, _attrs))}><!--[-->`);
  ssrRenderList($setup.list, (item, index) => {
    _push(`<span class="${ssrRenderClass([{ "cursor-pointer": index !== $setup.list.length - 1 }, "space-x-3"])}"><span class="${ssrRenderClass({
      "text-blue-500": index !== $setup.list.length - 1,
      "text-black": index === $setup.list.length - 1
    })}">${ssrInterpolate(item)}</span>`);
    if (index !== $setup.list.length - 1) {
      _push(`<span class="text-gray-500 mx-1">&gt;</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</span>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/Breadcrumb.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProductTitle",
  props: {
    image: {},
    title: {},
    description: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { image, title, description } = toRefs(props);
    const __returned__ = { props, image, title, description };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row space-x-5 items-center" }, _attrs))}><img${ssrRenderAttr("src", $setup.image)} alt="game-image" class="object-contain w-16 h-16"><div class="flex flex-col space-y-2"><div class="text-[28px] font-bold">${ssrInterpolate($setup.title)}</div><div class="text-sm">${ssrInterpolate($setup.description)}</div></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/landing-page/ProductTitle.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ProductTitle = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);

var DeliveryType = /* @__PURE__ */ ((DeliveryType2) => {
  DeliveryType2[DeliveryType2["ALL"] = 0] = "ALL";
  DeliveryType2[DeliveryType2["INSTANT"] = 1] = "INSTANT";
  DeliveryType2[DeliveryType2["FAST"] = 2] = "FAST";
  return DeliveryType2;
})(DeliveryType || {});

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CardProduct",
  props: {
    productImage: {},
    productName: {},
    productOriginalPrice: {},
    productDiscount: {},
    productAdjustmentPrice: {},
    averageDeliveryTime: {},
    soldCount: {},
    deliveryType: {},
    isAds: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { productImage, productName, productOriginalPrice, productDiscount, productAdjustmentPrice, averageDeliveryTime, soldCount, deliveryType, isAds } = toRefs(props);
    const __returned__ = { props, productImage, productName, productOriginalPrice, productDiscount, productAdjustmentPrice, averageDeliveryTime, soldCount, deliveryType, isAds, get DeliveryType() {
      return DeliveryType;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full h-full min-h-48 cursor-pointer rounded-lg shadow-lg" }, _attrs))}><div class="w-full relative"><img${ssrRenderAttr("src", $setup.productImage)} alt="product-image" class="object-cover rounded-t-lg w-full h-32">`);
  if ($setup.isAds) {
    _push(`<p class="absolute bottom-1 right-2 text-white">Ads</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="flex flex-col w-full h-full p-4 space-y-2"><p class="text-xs font-bold line-clamp-3">${ssrInterpolate($setup.productName)}</p>`);
  if ($setup.productDiscount) {
    _push(`<div class="flex flex-row items-center space-x-1"><div class="bg-red-500 rounded-lg p-1 text-xs text-white">${ssrInterpolate($setup.productDiscount)}</div><div class="line-through text-gray-500 text-xs">${ssrInterpolate($setup.productOriginalPrice)}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<p class="text-xl font-bold text-orange-600">${ssrInterpolate($setup.productDiscount ? $setup.productAdjustmentPrice : $setup.productOriginalPrice)}</p>`);
  if ($setup.deliveryType === $setup.DeliveryType.INSTANT) {
    _push(`<div class="flex flex-col"><p class="text-xs font-bold text-green-600">Pengiriman</p><p class="text-xs font-bold text-green-600 mt">Instant</p></div>`);
  } else if ($setup.deliveryType === $setup.DeliveryType.FAST) {
    _push(`<div class="flex flex-col"><p class="text-xs font-bold text-green-600">10 menit kirim</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="flex flex-col space-y-0.5 h-auto grow justify-end"><p class="text-xs text-gray-500">Rata-rata Kirim: ${ssrInterpolate($setup.averageDeliveryTime)}</p><p class="text-xs text-gray-500">${ssrInterpolate($setup.soldCount)} Terjual</p></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/landing-page/CardProduct.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const CardProduct = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);

const _sfc_main$5 = {};

function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-full cursor-pointer rounded-lg shadow-lg bg-white" }, _attrs))}><div class="w-full relative h-[115px] animate-pulse rounded-t-lg bg-gray-300"></div><div class="w-full p-4 space-y-2"><div class="w-full h-3 animate-pulse bg-gray-300 rounded-lg"></div><div class="flex flex-row items-center space-x-1"><div class="w-1/6 h-3 animate-pulse bg-gray-300 rounded-lg"></div><div class="w-1/3 h-3 animate-pulse bg-gray-300 rounded-lg"></div></div><div class="w-1/2 h-8 animate-pulse bg-gray-300 rounded-lg"></div><div class="flex flex-col space-y-0.5 pt-8"><div class="w-1/3 h-3 animate-pulse bg-gray-300 rounded-lg"></div><div class="w-1/4 h-3 animate-pulse bg-gray-300 rounded-lg"></div></div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/landing-page/CardPorudctLoading.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined
};
const CardProductLoading = /*#__PURE__*/_export_sfc(_sfc_main$5, [['ssrRender',_sfc_ssrRender$5]]);

const GLOBAL_ONBOARDING_2 = "https://files.itemku.com/illustration/itemku/home/onboarding/onboarding-global-2.png";

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ReviewBanner",
  props: {
    rating: {},
    reviewCount: {},
    productName: {},
    isMobile: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { rating, reviewCount, productName, isMobile } = toRefs(props);
    const __returned__ = { props, rating, reviewCount, productName, isMobile, get GLOBAL_ONBOARDING_2() {
      return GLOBAL_ONBOARDING_2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full rounded-lg" }, _attrs))}><div class="flex flex-row py-8 px-4 bg-gradient-to-b from-blue-500 to-blue-400 from-40% rounded-lg"><div class="flex flex-row w-1/2"><div class="flex flex-row space-x-4 items-center">`);
  if (!$setup.isMobile) {
    _push(`<img${ssrRenderAttr("src", $setup.GLOBAL_ONBOARDING_2)} class="w-[100px] h-[100px]">`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="font-bold text-sm text-white">Ulasan berbelanja ${ssrInterpolate($setup.productName)} di Itemku </div></div></div><div class="flex flex-col w-1/2 self-end h-[100px] items-end justify-center space-y-1"><div class="flex flex-row space-x-1"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5002 6.87968C18.4386 6.6949 18.3245 6.53212 18.1717 6.41132C18.0189 6.29052 17.8342 6.21697 17.6402 6.19968L12.4802 5.74968L10.4202 0.999683C10.3434 0.819294 10.2152 0.665476 10.0516 0.55736C9.88803 0.449244 9.69628 0.391602 9.5002 0.391602C9.30412 0.391602 9.11238 0.449244 8.9488 0.55736C8.78523 0.665476 8.65705 0.819294 8.5802 0.999683L6.5802 5.73968L1.4102 6.19968C1.21621 6.21697 1.03148 6.29052 0.878705 6.41132C0.72593 6.53212 0.611756 6.6949 0.5502 6.87968C0.476511 7.0734 0.464836 7.28523 0.516789 7.48588C0.568742 7.68652 0.681755 7.86607 0.8402 7.99968L4.7502 11.3897L3.5802 16.3897C3.54343 16.5762 3.56059 16.7693 3.62966 16.9464C3.69874 17.1236 3.81686 17.2773 3.9702 17.3897C4.12854 17.5048 4.31716 17.5708 4.5127 17.5797C4.70823 17.5886 4.90208 17.5399 5.0702 17.4397L9.5002 14.7797L13.9302 17.4597C14.0856 17.5487 14.2611 17.5969 14.4402 17.5997C14.652 17.6004 14.8586 17.5339 15.0302 17.4097C15.1835 17.2973 15.3017 17.1436 15.3707 16.9664C15.4398 16.7893 15.457 16.5962 15.4202 16.4097L14.2402 11.4097L18.1502 7.99968C18.3191 7.87368 18.4439 7.69755 18.5067 7.49642C18.5696 7.29528 18.5673 7.07944 18.5002 6.87968Z" fill="#FFBF00"></path></svg><div class="font-bold text-sm text-white">${ssrInterpolate($setup.rating)} / 5.0</div></div><div class="font-bold text-sm text-white text-end">Dari Total ${ssrInterpolate($setup.reviewCount)} Rating</div></div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/landing-page/ReviewBanner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ReviewBanner = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BottomSEOLinkPage",
  props: {
    title: {},
    productNameList: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { title, productNameList } = toRefs(props);
    const __returned__ = { props, title, productNameList };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-2" }, _attrs))}><div class="text-sm font-bold">${ssrInterpolate($setup.title)}</div><div class="flex flex-wrap items-center"><!--[-->`);
  ssrRenderList($setup.productNameList, (productName, index) => {
    _push(`<!--[--><div class="text-sm text-blue-300 cursor-pointer">${ssrInterpolate(productName)}</div>`);
    if (index < $setup.productNameList.length - 1) {
      _push(`<span class="mx-2">|</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/landing-page/BottomSEOLinkPage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BottomSEOLinkPage = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PriceList",
  props: {
    title: {},
    list: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { title, list } = toRefs(props);
    const __returned__ = { props, title, list };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col space-y-2" }, _attrs))}><p class="text-sm font-bold">${ssrInterpolate($setup.title)}</p><!--[-->`);
  ssrRenderList($setup.list, (item) => {
    _push(`<div class="flex flex-row border-b border-light-grey py-2"><div class="flex-shrink-0 w-3/4 pr-4 overflow-hidden"><p class="text-xs text-gray-400 leading-tight whitespace-nowrap line-clamp-1">${ssrInterpolate(item.name)}</p></div><div class="flex-shrink-0 w-1/4 flex justify-end"><p class="text-xs text-gray-400 leading-tight">${ssrInterpolate(item.price)}</p></div></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/landing-page/PriceList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PriceList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);

const MAX_SEO_PRICE_LIST_PRODUCT$1 = 10;
const BLUR$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUlZKqBwABfwDSiUgXoQAAAABJRU5ErkJggg==";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    landingPageProps: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const {
      landingPage,
      gameInfo,
      products,
      exchangeRate,
      regionData,
      currencySymbol,
      maxSellerRating,
      countSellerRating,
      relatedItemInfoPageLinks,
      itemType,
      relatedItemTypePageLinks,
      relatedGameIDPageLinks,
      priceInfos,
      configReducersReplica
    } = toRefs(props.landingPageProps);
    const isFetchProductLoading = ref(false);
    const onClickLoadMore = () => {
      fetchProduct();
    };
    const fetchProduct = async () => {
      isFetchProductLoading.value = true;
      const params = {
        is_include_game: 1,
        is_include_item_type: 1,
        is_include_item_info_group: 0,
        is_include_order_record: 1,
        is_from_web: 1,
        exclude_sharing_account_eligible: 1,
        is_include_upselling_product: 1,
        use_simple_pagination: 1,
        is_auto_delivery_first: 1,
        is_with_promotion: 1,
        is_include_instant_delivery: 1,
        is_default_product_list: 1,
        is_enough_stock: 1,
        page: 1,
        per_page: 48,
        sort: "popular",
        ...landingPage?.value?.game_id !== void 0 && { game_id: landingPage.value.game_id },
        ...landingPage?.value?.item_type_id !== void 0 && { item_type_id: landingPage.value.item_type_id },
        ...landingPage?.value?.item_info_id !== void 0 && { item_info_id: landingPage.value.item_info_id },
        is_exclusive: false,
        country_codes: ["ID"]
      };
      try {
        const response = await ApiHelper.get("/v1/product", params);
        if (response.success) {
          const formattedProducts = productListHelper(response.data.data, configReducersReplica?.value, REGION_CODE.INDONESIA);
          products.value = [
            ...products.value,
            ...formattedProducts
          ];
        } else {
          alert(`Error fetching products, ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        isFetchProductLoading.value = false;
      }
    };
    const __returned__ = { MAX_SEO_PRICE_LIST_PRODUCT: MAX_SEO_PRICE_LIST_PRODUCT$1, BLUR: BLUR$1, props, landingPage, gameInfo, products, exchangeRate, regionData, currencySymbol, maxSellerRating, countSellerRating, relatedItemInfoPageLinks, itemType, relatedItemTypePageLinks, relatedGameIDPageLinks, priceInfos, configReducersReplica, isFetchProductLoading, onClickLoadMore, fetchProduct, Breadcrumb, ProductTitle, CardProduct, CardProductLoading, ReviewBanner, BottomSEOLinkPage, PriceList, get currencyHelper() {
      return currencyHelper;
    }, get forceHttp() {
      return forceHttp;
    }, get mapCurrencySymbol() {
      return mapCurrencySymbol;
    }, get MONTH_NAME() {
      return MONTH_NAME;
    }, get DeliveryType() {
      return DeliveryType;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen mx-auto bg-white px-32 md:max-w-[1440px] min-w-[600px]" }, _attrs))}>`);
  _push(ssrRenderComponent($setup["Breadcrumb"], {
    list: ["Home", $setup.landingPage?.header_text ?? ""]
  }, null, _parent));
  _push(`<div class="mt-5">`);
  _push(ssrRenderComponent($setup["ProductTitle"], {
    image: $setup.gameInfo?.game.og_image_url ?? "",
    title: $setup.landingPage?.header_text ?? "",
    description: $setup.landingPage?.meta_description ?? ""
  }, null, _parent));
  _push(`</div><div class="grid grid-cols-4 gap-4 mt-5"><!--[-->`);
  ssrRenderList($setup.products, (product) => {
    _push(ssrRenderComponent($setup["CardProduct"], {
      key: product.id,
      productImage: $setup.forceHttp(product.image_url ?? "", $setup.BLUR),
      productName: product.name,
      productOriginalPrice: $setup.currencyHelper(
        $setup.exchangeRate,
        $setup.regionData,
        product.competitor_price && product.competitor_price > product.price ? product.competitor_price : product.price,
        $setup.currencySymbol ? $setup.currencySymbol[$setup.regionData?.country_code ?? "ID"] : ""
      ),
      productDiscount: product.discount ? `${Math.round(product.discount)}%` : void 0,
      productAdjustmentPrice: $setup.currencyHelper(
        $setup.exchangeRate,
        $setup.regionData,
        product.price,
        $setup.currencySymbol ? $setup.currencySymbol[$setup.regionData?.country_code ?? "ID"] : ""
      ),
      averageDeliveryTime: `${Math.floor((product.average_delivery_time ?? 0) / 60)} jam ${Math.floor((product.average_delivery_time ?? 0) % 60)} menit`,
      soldCount: product.order_count,
      deliveryType: product.use_instant_delivery ? $setup.DeliveryType.INSTANT : product.use_fast_delivery ? $setup.DeliveryType.FAST : $setup.DeliveryType.ALL,
      isAds: product.use_ads
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if ($setup.isFetchProductLoading) {
    _push(`<div class="grid grid-cols-4 md:grid-cols-2 gap-4 mt-5"><!--[-->`);
    ssrRenderList(4, (i) => {
      _push(ssrRenderComponent($setup["CardProductLoading"], { key: i }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="w-full text-center my-10 relative p-1"><div class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center"><div class="flex-grow border-t border-gray-300"></div><span class="mx-4 bg-white px-4 text-blue-500 flex items-center cursor-pointer"> Load More </span><div class="flex-grow border-t border-gray-300"></div></div></div><div class="space-y-4 my-5">`);
  _push(ssrRenderComponent($setup["ReviewBanner"], {
    "is-mobile": false,
    rating: `${$setup.maxSellerRating}`,
    reviewCount: `${$setup.countSellerRating}`,
    productName: $setup.landingPage?.meta_title ?? ""
  }, null, _parent));
  if ($setup.relatedItemInfoPageLinks && $setup.relatedItemInfoPageLinks.length > 0 && $setup.itemType?.name) {
    _push(ssrRenderComponent($setup["BottomSEOLinkPage"], {
      title: `Pilihan ${$setup.itemType?.name || ""} Lainnya`,
      productNameList: $setup.relatedItemInfoPageLinks.map((link) => link.name)
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.relatedItemTypePageLinks && $setup.gameInfo && $setup.relatedItemTypePageLinks.length > 0) {
    _push(ssrRenderComponent($setup["BottomSEOLinkPage"], {
      title: `Produk ${$setup.gameInfo?.game?.game_name ?? ""} lainnya`,
      productNameList: $setup.relatedItemTypePageLinks.map((link) => link.name)
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.relatedGameIDPageLinks && $setup.relatedGameIDPageLinks.length > 0) {
    _push(ssrRenderComponent($setup["BottomSEOLinkPage"], {
      title: "Kategori Lainnya",
      productNameList: $setup.relatedGameIDPageLinks.map((link) => link.name)
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="flex flex-col space-y-4 max-w-[640px]">`);
  if ($setup.products && $setup.products.length > 0) {
    _push(ssrRenderComponent($setup["PriceList"], {
      title: `Daftar Harga ${$setup.itemType?.name} Terbaru ${$setup.MONTH_NAME[(/* @__PURE__ */ new Date()).getMonth()]} ${(/* @__PURE__ */ new Date()).getFullYear()}`,
      list: $setup.products.slice(0, $setup.MAX_SEO_PRICE_LIST_PRODUCT).map((product) => {
        let priceText = $setup.currencyHelper(
          $setup.exchangeRate,
          $setup.regionData,
          product.price || 0,
          $setup.mapCurrencySymbol($setup.currencySymbol, $setup.regionData?.country_currency)
        );
        return {
          name: product.name,
          price: priceText
        };
      })
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.priceInfos && $setup.priceInfos.length > 0) {
    _push(ssrRenderComponent($setup["PriceList"], {
      title: `Daftar Harga ${$setup.itemType?.name} Terbaru ${(/* @__PURE__ */ new Date()).getDate()}/${(/* @__PURE__ */ new Date()).getMonth()}/${(/* @__PURE__ */ new Date()).getFullYear()}`,
      list: $setup.priceInfos.map((product) => {
        let priceText = $setup.currencyHelper(
          $setup.exchangeRate,
          $setup.regionData,
          product.price || 0,
          $setup.mapCurrencySymbol($setup.currencySymbol, $setup.regionData?.country_currency)
        );
        return {
          name: product.name,
          price: priceText
        };
      })
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/template/landing-page/desktop/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LandingPageTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const MAX_SEO_PRICE_LIST_PRODUCT = 10;
const BLUR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUlZKqBwABfwDSiUgXoQAAAABJRU5ErkJggg==";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    landingPageProps: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const {
      landingPage,
      gameInfo,
      products,
      exchangeRate,
      regionData,
      currencySymbol,
      maxSellerRating,
      countSellerRating,
      relatedItemInfoPageLinks,
      itemType,
      relatedItemTypePageLinks,
      relatedGameIDPageLinks,
      priceInfos,
      configReducersReplica
    } = toRefs(props.landingPageProps);
    const isFetchProductLoading = ref(false);
    const count = ref(1);
    const isNonDesktop = ref(false);
    onMounted(() => {
      isNonDesktop.value = isMobileOrTablet();
    });
    const onClickLoadMore = () => {
      fetchProduct();
    };
    const fetchProduct = async () => {
      isFetchProductLoading.value = true;
      const params = {
        is_include_game: 1,
        is_include_item_type: 1,
        is_include_item_info_group: 0,
        is_include_order_record: 1,
        is_from_web: 1,
        exclude_sharing_account_eligible: 1,
        is_include_upselling_product: 1,
        use_simple_pagination: 1,
        is_auto_delivery_first: 1,
        is_with_promotion: 1,
        is_include_instant_delivery: 1,
        is_default_product_list: 1,
        is_enough_stock: 1,
        page: 1,
        per_page: 48,
        sort: "popular",
        ...landingPage?.value?.game_id !== void 0 && { game_id: landingPage.value.game_id },
        ...landingPage?.value?.item_type_id !== void 0 && { item_type_id: landingPage.value.item_type_id },
        ...landingPage?.value?.item_info_id !== void 0 && { item_info_id: landingPage.value.item_info_id },
        is_exclusive: false,
        country_codes: ["ID"]
      };
      try {
        const response = await ApiHelper.get("/v1/product", params);
        if (response.success) {
          const formattedProducts = productListHelper(response.data.data, configReducersReplica?.value, REGION_CODE.INDONESIA);
          products.value = [
            ...products.value,
            ...formattedProducts
          ];
          count.value += 1;
        } else {
          alert(`Error fetching products, ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        isFetchProductLoading.value = false;
      }
    };
    const __returned__ = { MAX_SEO_PRICE_LIST_PRODUCT, BLUR, props, landingPage, gameInfo, products, exchangeRate, regionData, currencySymbol, maxSellerRating, countSellerRating, relatedItemInfoPageLinks, itemType, relatedItemTypePageLinks, relatedGameIDPageLinks, priceInfos, configReducersReplica, isFetchProductLoading, count, isNonDesktop, onClickLoadMore, fetchProduct, CardProduct, CardProductLoading, ReviewBanner, BottomSEOLinkPage, PriceList, get currencyHelper() {
      return currencyHelper;
    }, get forceHttp() {
      return forceHttp;
    }, get mapCurrencySymbol() {
      return mapCurrencySymbol;
    }, get MONTH_NAME() {
      return MONTH_NAME;
    }, get DeliveryType() {
      return DeliveryType;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen mx-auto bg-white min-w-0 max-w-[1023px]" }, _attrs))}><div class="flex items-center p-4 border-b border-gray-200"><button class="mr-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button><h1 class="text-sm">${ssrInterpolate($setup.landingPage?.meta_title || "Title")}</h1></div><div class="px-4"><div class="grid grid-cols-2 gap-4 mt-5"><!--[-->`);
  ssrRenderList($setup.products, (product) => {
    _push(ssrRenderComponent($setup["CardProduct"], {
      key: product.id,
      productImage: $setup.forceHttp(product.image_url ?? "", $setup.BLUR),
      productName: product.name,
      productOriginalPrice: $setup.currencyHelper(
        $setup.exchangeRate,
        $setup.regionData,
        product.competitor_price && product.competitor_price > product.price ? product.competitor_price : product.price,
        $setup.currencySymbol ? $setup.currencySymbol[$setup.regionData?.country_code ?? "ID"] : ""
      ),
      productDiscount: product.discount ? `${Math.round(product.discount)}%` : void 0,
      productAdjustmentPrice: $setup.currencyHelper(
        $setup.exchangeRate,
        $setup.regionData,
        product.price,
        $setup.currencySymbol ? $setup.currencySymbol[$setup.regionData?.country_code ?? "ID"] : ""
      ),
      averageDeliveryTime: `${Math.floor((product.average_delivery_time ?? 0) / 60)} jam ${Math.floor((product.average_delivery_time ?? 0) % 60)} menit`,
      soldCount: product.order_count,
      deliveryType: product.use_instant_delivery ? $setup.DeliveryType.INSTANT : product.use_fast_delivery ? $setup.DeliveryType.FAST : $setup.DeliveryType.ALL,
      isAds: product.use_ads
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if ($setup.isFetchProductLoading) {
    _push(`<div class="grid grid-cols-4 md:grid-cols-2 gap-4 mt-5"><!--[-->`);
    ssrRenderList(4, (i) => {
      _push(ssrRenderComponent($setup["CardProductLoading"], { key: i }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="text-xs my-5 text-gray-400">${ssrInterpolate($setup.landingPage?.meta_description)}</div><div class="w-full text-center my-10 relative p-1"><div class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center"><div class="flex-grow border-t border-gray-300"></div><span class="mx-4 bg-white px-4 text-blue-500 flex items-center cursor-pointer"> Load More </span><div class="flex-grow border-t border-gray-300"></div></div></div><div class="space-y-4 my-5">`);
  _push(ssrRenderComponent($setup["ReviewBanner"], {
    "is-mobile": true,
    rating: `${$setup.maxSellerRating}`,
    reviewCount: `${$setup.countSellerRating}`,
    productName: $setup.landingPage?.meta_title ?? ""
  }, null, _parent));
  if ($setup.relatedItemInfoPageLinks && $setup.relatedItemInfoPageLinks.length > 0 && $setup.itemType?.name) {
    _push(ssrRenderComponent($setup["BottomSEOLinkPage"], {
      title: `Pilihan ${$setup.itemType?.name || ""} Lainnya`,
      productNameList: $setup.relatedItemInfoPageLinks.map((link) => link.name)
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.relatedItemTypePageLinks && $setup.gameInfo && $setup.relatedItemTypePageLinks.length > 0) {
    _push(ssrRenderComponent($setup["BottomSEOLinkPage"], {
      title: `Produk ${$setup.gameInfo?.game.game_name ?? ""} lainnya`,
      productNameList: $setup.relatedItemTypePageLinks.map((link) => link.name)
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.relatedGameIDPageLinks && $setup.relatedGameIDPageLinks.length > 0) {
    _push(ssrRenderComponent($setup["BottomSEOLinkPage"], {
      title: "Kategori Lainnya",
      productNameList: $setup.relatedGameIDPageLinks.map((link) => link.name)
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="flex flex-col space-y-4 max-w-[640px]">`);
  if ($setup.products && $setup.products.length > 0) {
    _push(ssrRenderComponent($setup["PriceList"], {
      title: `Daftar Harga ${$setup.itemType?.name} Terbaru ${$setup.MONTH_NAME[(/* @__PURE__ */ new Date()).getMonth()]} ${(/* @__PURE__ */ new Date()).getFullYear()}`,
      list: $setup.products.slice(0, $setup.MAX_SEO_PRICE_LIST_PRODUCT).map((product) => {
        let priceText = $setup.currencyHelper(
          $setup.exchangeRate,
          $setup.regionData,
          product.price || 0,
          $setup.mapCurrencySymbol($setup.currencySymbol, $setup.regionData?.country_currency)
        );
        return {
          name: product.name,
          price: priceText
        };
      })
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($setup.priceInfos && $setup.priceInfos.length > 0) {
    _push(ssrRenderComponent($setup["PriceList"], {
      title: `Daftar Harga ${$setup.itemType?.name} Terbaru ${(/* @__PURE__ */ new Date()).getDate()}/${(/* @__PURE__ */ new Date()).getMonth()}/${(/* @__PURE__ */ new Date()).getFullYear()}`,
      list: $setup.priceInfos.map((product) => {
        let priceText = $setup.currencyHelper(
          $setup.exchangeRate,
          $setup.regionData,
          product.price || 0,
          $setup.mapCurrencySymbol($setup.currencySymbol, $setup.regionData?.country_currency)
        );
        return {
          name: product.name,
          price: priceText
        };
      })
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/template/landing-page/mobile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LandingPageMobileTemplate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const landingPageProps = {
    landingPage: void 0,
    products: [],
    gameInfo: void 0,
    productsPage: void 0,
    productsPerPage: void 0,
    productsAllCount: void 0,
    isBot: false,
    languageCode: "id",
    countryCode: "ID",
    seoBottomContent: void 0,
    exchangeRate: void 0,
    regionData: void 0,
    isUsingNewSeoPage: false,
    currencySymbol: void 0,
    seoParams: void 0,
    maxSellerRating: 0,
    countSellerRating: 0,
    relatedItemTypePageLinks: [],
    relatedItemInfoPageLinks: [],
    relatedGameIDPageLinks: [],
    itemType: void 0,
    priceInfos: [],
    configReducersReplica: void 0,
    isMobile: false
  };
  let userRegionData = {
    default_language_code: LANGUAGE_CODE.ID,
    default_locale_id: DEFAULT_LOCALE_CODE.INDONESIA,
    country_code: REGION_CODE.INDONESIA,
    country_currency: CURRENCY_CODE.INDONESIA
  };
  const generateRating = (products) => {
    let maxSellerRating = 0;
    let countSellerRating = 0;
    for (const product of products) {
      if (product.seller_rating) {
        if (product.seller_rating >= maxSellerRating) {
          if (maxSellerRating !== product.seller_rating) {
            countSellerRating = 0;
          }
          maxSellerRating = product.seller_rating || 0;
          countSellerRating += product.seller_rating_count || 0;
        }
      }
    }
    return { maxSellerRating, countSellerRating };
  };
  const landingPageParams = {
    country_code: "ID",
    uri: "welkin-genshin"
    // country_code: "US",
    // uri: "sung-jin-woo-anime-vanguard",
  };
  const landingPageResp = await ApiHelper.get("/v1/landing-page", landingPageParams);
  if (landingPageResp && landingPageResp.success && landingPageResp.data.data[0]) {
    const landingPageData = landingPageResp.data.data[0];
    landingPageProps.landingPage = landingPageData;
    const productParams = {
      is_include_game: 1,
      is_include_item_type: 1,
      is_include_item_info_group: 0,
      is_include_order_record: 1,
      is_from_web: 1,
      exclude_sharing_account_eligible: 1,
      is_include_upselling_product: 1,
      use_simple_pagination: 1,
      is_auto_delivery_first: 1,
      is_with_promotion: 1,
      is_include_instant_delivery: 1,
      is_default_product_list: 1,
      is_enough_stock: 1,
      page: 1,
      per_page: 48,
      sort: "popular",
      game_id: landingPageData.game_id || void 0,
      item_type_id: landingPageData.item_type_id || void 0,
      item_info_id: landingPageData.item_info_id || void 0,
      is_exclusive: false,
      country_codes: ["ID"]
    };
    const [
      configResp,
      productResp,
      gameInfoResp
    ] = await Promise.all([
      ApiHelper.get("/v1/config"),
      ApiHelper.get("/v1/product", productParams),
      ApiHelper.get("/v1/product/game-info", { game_id: landingPageData.game_id })
    ]);
    landingPageProps.configReducersReplica = {
      configList: configResp.data.data,
      configByFeature: {},
      lastUpdate: 0,
      constant: {}
    };
    landingPageProps.products = productListHelper(productResp?.data?.data ?? [], landingPageProps.configReducersReplica, REGION_CODE.INDONESIA)?.map((product) => replaceUndefinedPropsToNull(product)) ?? [];
    landingPageProps.productsPage = productResp?.data?.current_page;
    landingPageProps.productsPerPage = productResp?.data?.item_per_page;
    landingPageProps.productsAllCount = productResp?.data?.total_item;
    const sellerRating = generateRating(landingPageProps.products);
    landingPageProps.maxSellerRating = sellerRating.maxSellerRating;
    landingPageProps.countSellerRating = sellerRating.countSellerRating;
    let currentItemType;
    if (gameInfoResp?.success && gameInfoResp?.data) {
      const gameInfoData = gameInfoHelper(gameInfoResp.data);
      landingPageProps.gameInfo = gameInfoData;
      const sameGenreGameResp = await ApiHelper.get("/v1/product/genre/game-list", { genre_id: gameInfoData.genre?.id || 0, per_page: 100 });
      const sameGenreGamesData = sameGenreGameResp?.data?.data?.map((genre) => genre.game) || [];
      currentItemType = gameInfoData.item_type.find((itemType) => itemType.id === landingPageData.item_type_id);
      if (currentItemType && sameGenreGamesData.length > 0) {
        const otherGames = shuffle(sameGenreGamesData).slice(0, 5);
        const sameGenreItemInfoResps = await Promise.all(otherGames.map(async (game) => ApiHelper.get("/v1/product/monthly-top-item-info", { game_id: game.id })));
        let sameGenreItemInfosData = [];
        for (const sameGenreItemInfoResp of sameGenreItemInfoResps) {
          sameGenreItemInfosData = [...sameGenreItemInfosData, ...sameGenreItemInfoResp.data.data.map((top) => top.item_info)];
        }
        sameGenreItemInfosData = shuffle(sameGenreItemInfosData).slice(0, 20);
        const relatedGameIDLinksData = [];
        if (sameGenreItemInfosData && sameGenreGamesData) {
          for (const itemInfo of sameGenreItemInfosData) {
            const game = sameGenreGamesData.find((g) => g.id === itemInfo.game_id);
            if (!game) continue;
            relatedGameIDLinksData.push({ name: itemInfo.name + " " + game.name, href: "" });
          }
        }
        landingPageProps.relatedGameIDPageLinks = relatedGameIDLinksData;
      }
      const seoBottomContentResp = await ApiHelper.get("/v1/seo-bottom-content", {
        game_id: gameInfoData.game.game_id,
        item_type_id: landingPageData.item_type_id,
        item_info_id: landingPageData.item_info_id,
        page_type: SEO_BOTTOM_CONTENT_TYPE.LANDING_PAGE_GENERATOR,
        is_active: true,
        country_code: "ID"
      });
      landingPageProps.seoBottomContent = seoBottomContentResp.data.data[0];
      const currentItemInfo = currentItemType?.item_info.find((itemInfo) => itemInfo.id === landingPageData.item_info_id);
      const currentDate = /* @__PURE__ */ new Date();
      landingPageProps.seoParams = {
        item_type: currentItemType?.name || "",
        game_name: gameInfoData.game.game_name,
        item_info: currentItemInfo?.name || "",
        month: MONTH_NAME[currentDate.getMonth()],
        year: `${currentDate.getFullYear()}`,
        seo_name: landingPageData.game_id.toString()
      };
    }
    const [expansionCountry, currencySymbol] = await Promise.all([
      ApiHelper.get("/v1/expansion-country", { country_code: userRegionData.country_code }),
      ApiHelper.get("/v1/currency/detail")
    ]);
    const regionData = expansionCountry?.data[0];
    const foreignExchangeRateParams = {
      source_currency: regionData?.country_currency || "IDR",
      target_currency: "IDR"
    };
    const relatedLandingPageCountParams = {
      country_code: userRegionData.country_code,
      game_id: landingPageData.game_id,
      item_type_id: landingPageData.item_type_id,
      per_page: 1
    };
    const [
      currencyExchangeRateResp,
      relatedLandingPageCountResp
    ] = await Promise.all([
      ApiHelper.get("/v1/foreign-exchange/rate", foreignExchangeRateParams),
      ApiHelper.get("/v1/landing-page", relatedLandingPageCountParams)
    ]);
    let globalProps = {
      exchangeRate: { source_currency: "IDR", target_currency: "IDR", exchange_rate: 1 },
      regionData: { country_name: "Indonesia", default_language_code: "ID", country_code: REGION_CODE.INDONESIA },
      currencySymbolList: void 0
    };
    if (regionData && currencyExchangeRateResp?.data[0]) {
      globalProps = {
        exchangeRate: currencyExchangeRateResp?.data[0],
        regionData,
        currencySymbolList: currencySymbol?.listSymbol ?? void 0
      };
    }
    landingPageProps.exchangeRate = globalProps.exchangeRate;
    landingPageProps.regionData = globalProps.regionData;
    landingPageProps.currencySymbol = globalProps.currencySymbolList;
    const relatedLandingPagesCount = relatedLandingPageCountResp?.data.total_item ?? 0;
    const perPage = 20;
    const page = Math.ceil(Math.random() * Math.ceil(relatedLandingPagesCount / perPage));
    const relatedLandingPageResp = await ApiHelper.get("/v1/landing-page", {
      country_code: userRegionData.country_code,
      game_id: landingPageData.game_id,
      item_type_id: landingPageData.item_type_id,
      page,
      per_page: perPage
    });
    let relatedLandingPagesData = [];
    if (relatedLandingPageResp?.data?.data?.length > 0) {
      relatedLandingPagesData = relatedLandingPageResp.data.data;
    }
    relatedLandingPagesData = relatedLandingPagesData.filter((relatedPage) => {
      if (landingPageData.uri === relatedPage.uri) {
        return false;
      }
      return true;
    });
    let relatedItemInfoPageLinksData = [];
    if (relatedLandingPagesData && relatedLandingPagesData.length > 0) {
      for (const relatedLandingPage of relatedLandingPagesData) {
        const foundItemInfo = currentItemType?.item_info.find((itemInfo) => itemInfo.id === relatedLandingPage.item_info_id);
        if (foundItemInfo) {
          relatedItemInfoPageLinksData.push({ name: foundItemInfo.name, href: "" });
        }
      }
    }
    landingPageProps.relatedItemInfoPageLinks = relatedItemInfoPageLinksData;
    landingPageProps.itemType = currentItemType;
    let relatedItemTypeLinksData = [];
    if (landingPageProps.gameInfo) {
      const gameInfo = landingPageProps.gameInfo;
      for (const itemType of gameInfo.item_type) {
        relatedItemTypeLinksData.push({ name: itemType.name, href: "" });
      }
    }
    landingPageProps.relatedItemTypePageLinks = relatedItemTypeLinksData;
    const averagePrice = landingPageProps.products.reduce((sum, product) => sum + product.price, 0) / landingPageProps.products.length;
    const cheapestPrice = landingPageProps.products.reduce((minPrice, product) => Math.min(minPrice, product.price), Infinity);
    const mostExpensivePrice = landingPageProps.products.reduce((maxPrice, product) => Math.max(maxPrice, product.price), -Infinity);
    landingPageProps.priceInfos = [
      {
        name: `Harga Rata-Rata ${landingPageProps.itemType?.name ?? ""} se ${landingPageProps.regionData.country_name ?? ""}`,
        price: averagePrice
      },
      {
        name: `Estimasi Harga ${currentItemType?.name || ""} Termurah se ${landingPageProps.regionData.country_name}`,
        price: cheapestPrice
      },
      {
        name: `Estimasi Harga ${currentItemType?.name || ""} Termahal se ${landingPageProps.regionData.country_name}`,
        price: mostExpensivePrice
      }
    ];
  }
  const userAgent = Astro2.request.headers.get("user-agent") || "";
  landingPageProps.isMobile = isUserAgentMobile(userAgent);
  const title = "Hello World!";
  return renderTemplate`<html> <head><!-- Astro uses a JSX-like syntax in it's body --><title>${title}</title>${renderHead()}</head> <body> <main> ${!landingPageProps.isMobile ? renderTemplate`${renderComponent($$result, "LandingPageTemplate", LandingPageTemplate, { "landingPageProps": landingPageProps })}` : renderTemplate`${renderComponent($$result, "LandingPageMobileTemplate", LandingPageMobileTemplate, { "landingPageProps": landingPageProps })}`} </main> </body></html>`;
}, "/Users/royadvandy/Projects/itemku/itemku-frontend-astro-vue/src/pages/index.astro", void 0);

const $$file = "/Users/royadvandy/Projects/itemku/itemku-frontend-astro-vue/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
