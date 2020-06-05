import {CartActionTypes} from './cart-types'

export const toggleCartHidden = showCart => ({
    type:CartActionTypes.TOGGLE_CART_HIDDED   
})
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload:item
})
export const removeItem = item =>({
    type:CartActionTypes.REMOVE_ITEM,
    payload:item
})

export const clearItemFromCard = item =>({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload:item
})
