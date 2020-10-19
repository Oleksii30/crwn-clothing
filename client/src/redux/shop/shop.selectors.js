import {createSelector} from 'reselect'

const selectShop = state => state.shop 

export const selectShopItems = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectShopItems],
    collections => collections? Object.keys(collections).map(key => collections[key]):[]
)

export const selectCollection = collectionUrlParams => 
createSelector(
    [selectShopItems],
    collections =>collections? collections[collectionUrlParams]:null
)

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching 
)

export const selectIfCollectioLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)