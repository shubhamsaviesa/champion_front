import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'

const initialState = {
  loading: false,
  ShopifyData: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const InsertShopifyData = createAsyncThunk('Shopify/ShopifyListing', (ShopifyData) => {
   return AxiosInstance({
    url: "/ShopifyCredential",
    method: "POST",
    data: ShopifyData,
    headers:""
  }).then(response => response.data
  ).catch((e) => { console.log(e) })
})

const ShopifySlice = createSlice({
  name: 'Shopify',
  initialState,
  extraReducers: builder => {
    builder.addCase(InsertShopifyData.pending, state => {
      state.loading = true
    })
    builder.addCase(InsertShopifyData.fulfilled, (state, action) => {
      state.loading = false
      state.ShopifyData = action.payload
      state.error = ''
    })
    builder.addCase(InsertShopifyData.rejected, (state, action) => {
      state.loading = false
      state.ShopifyData = []
      state.error = action.error.message
    })

  }
})


export default ShopifySlice.reducer
