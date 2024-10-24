<template>
  <div class="min-h-screen mx-auto bg-white min-w-0 max-w-[1023px]">
    <div class="flex items-center p-4 border-b border-gray-200">
      <button class="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <h1 class="text-sm">{{ landingPage?.meta_title || 'Title' }}</h1>
    </div>

    <div class="px-4">
      <div class="grid grid-cols-2 gap-4 mt-5">
        <CardProduct
          v-for="product in products"
          :key="product.id"
          :productImage="forceHttp(product.image_url ?? '', BLUR)"
          :productName="product.name"
          :productOriginalPrice="currencyHelper(
            exchangeRate, 
            regionData,
            product.competitor_price && product.competitor_price > product.price ? product.competitor_price : product.price,
            currencySymbol ? currencySymbol[regionData?.country_code ?? 'ID'] : ''
          )"
          :productDiscount="product.discount ? `${Math.round(product.discount)}%` : undefined"
          :productAdjustmentPrice="currencyHelper(
            exchangeRate,
            regionData,
            product.price,
            currencySymbol ? currencySymbol[regionData?.country_code ?? 'ID'] : ''
          )"
          :averageDeliveryTime="`${Math.floor((product.average_delivery_time ?? 0) / 60)} jam ${Math.floor((product.average_delivery_time ?? 0) % 60)} menit`"
          :soldCount="product.order_count"
          :deliveryType="product.use_instant_delivery ? DeliveryType.INSTANT : (product.use_fast_delivery ? DeliveryType.FAST : DeliveryType.ALL)"
          :isAds="product.use_ads"
        />
      </div>

      <div v-if="isFetchProductLoading" class="grid grid-cols-4 md:grid-cols-2 gap-4 mt-5">
        <CardProductLoading v-for="i in 4" :key="i" />
      </div>

      <div class="text-xs my-5 text-gray-400">{{ landingPage?.meta_description }}</div>

      <div class="w-full text-center my-10 relative p-1">
        <div class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 bg-white px-4 text-blue-500 flex items-center cursor-pointer" @click="onClickLoadMore">
            Load More
            <!-- <svg class="w-4 h-4 text-blue-500 ml-2 transition-transform duration-300 transform" :class="{ 'rotate-180': isOpen }" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg> -->
          </span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      <div class="space-y-4 my-5">
        <ReviewBanner :is-mobile="true" :rating="`${maxSellerRating}`" :reviewCount="`${countSellerRating}`" :productName="landingPage?.meta_title ?? ''" />
        <BottomSEOLinkPage
          v-if="relatedItemInfoPageLinks && relatedItemInfoPageLinks.length > 0 && itemType?.name"
          :title="`Pilihan ${itemType?.name || ''} Lainnya`"
          :productNameList="relatedItemInfoPageLinks.map((link: ILandingPaageLink) => link.name)"
        />
        <BottomSEOLinkPage 
          v-if="relatedItemTypePageLinks && gameInfo && relatedItemTypePageLinks.length > 0"
          :title="`Produk ${gameInfo?.game.game_name ?? ''} lainnya`"
          :productNameList="relatedItemTypePageLinks.map((link: ILandingPaageLink) => link.name)"
        />
        <BottomSEOLinkPage 
          v-if="relatedGameIDPageLinks && relatedGameIDPageLinks.length > 0"
          :title="'Kategori Lainnya'"
          :productNameList="relatedGameIDPageLinks.map((link: ILandingPaageLink) => link.name)"
        />
        <div class='flex flex-col space-y-4 max-w-[640px]'>
          <PriceList
            v-if="products && products.length > 0"
            :title="`Daftar Harga ${itemType?.name} Terbaru ${MONTH_NAME[new Date().getMonth()]} ${new Date().getFullYear()}`"
            :list="products.slice(0, MAX_SEO_PRICE_LIST_PRODUCT).map((product: IProduct) => {
              let priceText = currencyHelper(
                exchangeRate,
                regionData,
                product.price || 0,
                mapCurrencySymbol(currencySymbol, regionData?.country_currency),
              );
              return {
                name: product.name,
                price: priceText,
              }
            })"
          />
          <PriceList
            v-if="priceInfos && priceInfos.length > 0"
            :title="`Daftar Harga ${itemType?.name} Terbaru ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`"
            :list="priceInfos.map((product: IPriceList) => {
              let priceText = currencyHelper(
                exchangeRate,
                regionData,
                product.price || 0,
                mapCurrencySymbol(currencySymbol, regionData?.country_currency),
              );
              return {
                name: product.name,
                price: priceText,
              }
            })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';
import type { ILandingPaageLink, ILandingPageProps, IPriceList } from '@/types/landing-page';
import CardProduct from "@/components/landing-page/CardProduct.vue";
import CardProductLoading from "@/components/landing-page/CardPorudctLoading.vue";
import ReviewBanner from "@/components/landing-page/ReviewBanner.vue";
import BottomSEOLinkPage from "@/components/landing-page/BottomSEOLinkPage.vue";
import PriceList from "@/components/landing-page/PriceList.vue";
import { currencyHelper, forceHttp, mapCurrencySymbol, isMobileOrTablet } from "@/utils/common-helper";
import { MONTH_NAME } from "@/constants/date";
import { DeliveryType } from "@/types/delivery";
import ApiHelper from '@/utils/api';
import { REGION_CODE } from '@/types/region';
import { productListHelper } from '@/utils/product-helper';
import type { IProduct } from '@/types/product';

const MAX_SEO_PRICE_LIST_PRODUCT = 10;
const BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUlZKqBwABfwDSiUgXoQAAAABJRU5ErkJggg==';

const props = defineProps<{
  landingPageProps: ILandingPageProps
}>()

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
  configReducersReplica,
} = toRefs(props.landingPageProps)

const isFetchProductLoading = ref(false)
const count = ref(1)
const isNonDesktop = ref(false)

onMounted(() => {
  isNonDesktop.value = isMobileOrTablet()
})

const onClickLoadMore = () => {
  fetchProduct()
}

const fetchProduct = async () => {
  isFetchProductLoading.value = true

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
    sort: 'popular',
    ...(landingPage?.value?.game_id !== undefined && { game_id: landingPage.value.game_id }),
    ...(landingPage?.value?.item_type_id !== undefined && { item_type_id: landingPage.value.item_type_id }),
    ...(landingPage?.value?.item_info_id !== undefined && { item_info_id: landingPage.value.item_info_id }),
    is_exclusive: false,
    country_codes: ['ID'],
  };

  try {
    const response = await ApiHelper.get('/v1/product', params);
    if (response.success) {
      const formattedProducts = productListHelper(response.data.data, configReducersReplica?.value, REGION_CODE.INDONESIA);
      products.value = [
        ...products.value, 
        ...formattedProducts,
      ]
      count.value += 1
    } else {
      alert(`Error fetching products, ${response.message}`);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isFetchProductLoading.value = false;
  }
}

</script>
