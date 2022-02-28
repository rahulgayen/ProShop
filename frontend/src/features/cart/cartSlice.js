import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
const cartItems = localStorage.getItem("proshopCart") ? JSON.parse(localStorage.getItem("proshopCart"))?.cart?.cartItems : []
const initialState = {
    cart: { cartItems }
}
export const addCartItem = createAsyncThunk("cart/add-cart-item", async (cartPayload, thunkAPI) => {
    try {
        return await cartService.addCartItem(cartPayload)
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeCartItem: (state, action) => {
            state.cart.cartItems = state.cart.cartItems.filter((item) => item.product !== action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addCartItem.fulfilled, (state, action) => {
                const item = action.payload;
                const existItem = state.cart.cartItems.find((x) => x.product === item.product)
                if (existItem) {
                    state.cart.cartItems = state.cart.cartItems.map((product) => { return product.product === item.product ? item : product })
                } else {
                    state.cart.cartItems.push(item)
                }
                localStorage.setItem('proshopCart', JSON.stringify(state))
            })
            .addCase(addCartItem.rejected, () => { })
    }
})

export const { removeCartItem } = cartSlice.actions;
export default cartSlice.reducer