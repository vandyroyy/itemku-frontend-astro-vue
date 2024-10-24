import type { IConfigReducers } from "@/types/config";
import { ITEM_TYPE_RISK_TYPE, type IHackbackChecking, type IProduct } from "@/types/product";
import { REGION_CODE } from "@/types/region";
import { forceHttps } from "@/utils/common-helper";

export const productListHelper = (data: any, configReducers: IConfigReducers | any = undefined, countryCode: string = REGION_CODE.INDONESIA): Array<IProduct> => {
  const defaultImageList = configReducers ? JSON.parse(configReducers.configList.DEFAULT_IMAGE_GLOBAL) : [];
  const c2cHiddenGameIDs = configReducers ? JSON.parse(configReducers.configList.C2C_HIDDEN_GAME_IDS) : [];
  const forceGenshinDefaultImage = configReducers ? configReducers.configList.FORCE_GENSHIN_DEFAULT_IMAGE : '';

  return data?.filter((item: any) => {
    if (configReducers !== undefined) {
      return c2cHiddenGameIDs.indexOf(item.game_id) == -1;
    }
    return true;
  }).map(
    (item: any): IProduct => {
      const productImage =
        item.images && item.images.length > 0 && item.images[0].image_url ? forceHttps(item.images[0].image_url) : null;
      const thumbImage =
        item.images && item.images.length > 0 && item.images[0].thumbnail_image_url
          ? forceHttps(item.images[0].thumbnail_image_url)
          : null;
      const normalImage = thumbImage || productImage || '';
      const product: IProduct = {
        name: item.name,
        seo_string: item.seo_string,
        game_name: item.game ? item.game.name : '',
        game_id: item.game_id ? item.game_id : undefined,
        game_slug: item.game?.slug || '',
        image_url: (countryCode && forceGenshinDefaultImage && (item.game_id == 217 || item.game?.name == 'Genshin Impact')) ?
          defaultImageList[String(item.item_type_id)] || normalImage : normalImage,
        id: item.id,
        price: item.price,
        competitor_price: item.competitor_price,
        discount:
          item.competitor_price && item.competitor_price > item.price
            ? ((item.competitor_price - item.price) / item.competitor_price) * 100
            : 0,
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
        seller_profile_picture: item.seller.profile_picture_url ? item.seller.profile_picture_url : '',
        is_itemku_partner: false, // currently disabled this feature and replace it with anti hackback
        auction_event: item.auction_event,
        base_unit: item.base_unit ? item.base_unit : undefined,
      };

      if (configReducers !== undefined) {
        product.is_antihackback = isAntiHackback({
          configReducers: configReducers,
          configList: configReducers?.configList,
          itemCategoryId: product.item_category_id,
          withRiskChecking: true,
          riskyTypeId: item.item_type?.risky_type_id,
        });
      }

      return product;
    },
  );
};

export const isAntiHackback = (params: IHackbackChecking): boolean => {
  const accountCategoryId = params.configList?.ACCOUNT_CATEGORY_ID ?? params.configReducers?.ACCOUNT_CATEGORY_ID;
  const topupLoginCategoryId = params.configList?.TOPUP_LOGIN_CATEGORY_ID ?? params.configReducers?.TOPUP_LOGIN_CATEGORY_ID;
  const boostingCategoryId = params.configList?.JOKI_ITEM_CATEGORY_ID ?? params.configReducers?.JOKI_ITEM_CATEGORY_ID;

  const isAccountType = accountCategoryId === params.itemCategoryId && (params.withRiskChecking ? params.riskyTypeId == ITEM_TYPE_RISK_TYPE.HIGH_RISK : true);
  const isTopupLoginType = topupLoginCategoryId === params.itemCategoryId;
  const isBoostingType = boostingCategoryId === params.itemCategoryId;

  const conditions = isAccountType || isTopupLoginType || isBoostingType;

  return conditions;
};

// const productImageHelper = (item: any) => {
//   if (isSupportWebp()) {
//     return item.images[0].alternate_image_url ? item.images[0].alternate_image_url : item.images[0].image_url;
//   }
//   return item.images[0].image_url;
// };

// function isSupportWebp() {
//   const isMac = osName === OsTypes.MAC_OS;
//   const isApple = osName === OsTypes.IOS;
//   if (isApple) {
//     const isNewSafari = isSafari() && parseFloat(browserVersion) >= 14;
//     return isNewSafari || isChrome;
//   }
//   if (isMac) {
//     const isMacBigSur = parseFloat(osVersion) >= 11;
//     const isNewSafari = browserName === BrowserTypes.Safari && parseFloat(browserVersion) >= 14;
//     return isMacBigSur && isNewSafari;
//   } else {
//     return true;
//   }
// }

// const thumbImageHelper = (item: any) => {
//   if (isSupportWebp()) {
//     return item.images[0].alternate_thumbnail_image_url
//       ? item.images[0].alternate_thumbnail_image_url
//       : item.images[0].thumbnail_image_url;
//   }
//   return item.images[0].image_url;
// };