import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'

const initialState = {
  loading: false,
  BigcommerceData: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const InsertBigcommerceData = createAsyncThunk('Bigcommerce/BigcommerceListing', (BigcommerceData) => {
   return AxiosInstance({
    url: "/BigcommerceCredential",
    method: "POST",
    data: BigcommerceData,
}).then(response =>console.log("response.data bigcommerce",response.data)
  ).catch((e) => { console.log(e) })
})

const BigcommerceSlice = createSlice({
  name: 'Bigcommerce',
  initialState,
  extraReducers: builder => {
    builder.addCase(InsertBigcommerceData.pending, state => {
      state.loading = true
    })
    builder.addCase(InsertBigcommerceData.fulfilled, (state, action) => {
      state.loading = false
      state.BigcommerceData = action.payload
      state.error = ''
    })
    builder.addCase(InsertBigcommerceData.rejected, (state, action) => {
      state.loading = false
      state.BigcommerceData = []
      state.error = action.error.message
    })

  }
})


export default BigcommerceSlice.reducer
