import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
const initialState = {
    products: [],
    product: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const getProducts = createAsyncThunk("product/get-products", async (_, thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getProduct = createAsyncThunk("product/get-product", async (productId, thunkAPI) => {
    try {
        return await productService.getProduct(productId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.isLoading = false;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                state.isLoading = false;
            });
    },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;
