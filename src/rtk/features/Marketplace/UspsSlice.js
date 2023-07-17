import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'

const initialState = {
  loading: false,
  UspsData: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const InsertUspsData = createAsyncThunk('Usps/UspsListing', (UspsData) => {
   return AxiosInstance({
    url: "/uspscecredential",
    method: "POST",
    data: UspsData,
    
  }).then(response => response.data
  ).catch((e) => { console.log(e) })
})

const UspsSlice = createSlice({
  name: 'Usps',
  initialState,
  extraReducers: builder => {
    builder.addCase(InsertUspsData.pending, state => {
      state.loading = true
    })
    builder.addCase(InsertUspsData.fulfilled, (state, action) => {
      state.loading = false
      state.UspsData = action.payload
      state.error = ''
    })
    builder.addCase(InsertUspsData.rejected, (state, action) => {
      state.loading = false
      state.UspsData = []
      state.error = action.error.message
    })

  }
})


export default UspsSlice.reducer
