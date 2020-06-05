import {createSelector} from 'reselect'

const selectShop = state => state.shop 

export const selectShopItems = createSelector(
    [selectShop],
    shop => shop.shopItems
)

export const selectCollectionForPreview = createSelector(
    [selectShopItems],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParams => 
createSelector(
    [selectShopItems],
    collections =>collections[collectionUrlParams]
)