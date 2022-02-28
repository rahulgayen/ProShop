import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"
import cartReducer from "../features/cart/cartSlice"
export default configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer
    }
})