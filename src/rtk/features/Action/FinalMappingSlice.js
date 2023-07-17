import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'

const initialState = {
  loading: false,
  bulkimportData: [],
  error: ""
}

export const finalMappingData = createAsyncThunk('action/addtemplete', (finalmappedObj) => {
  return AxiosInstance({
    url: "/mapTemplate/:id",
    method: "POST",
    data: finalmappedObj
  }).then(response => response.data
  ).catch((e) => { console.log(e) })
})

const FinalTemplateSlice = createSlice({
  name: 'bulkimportFinalMapping',
  initialState,
  extraReducers: builder => {
     builder.addCase(finalMappingData.pending, state => {
      state.loading = true
    })
    builder.addCase(finalMappingData.fulfilled, (state, action) => {
      state.loading = false
      state.bulkimportData = action.payload
      state.error = ''
    })
    builder.addCase(finalMappingData.rejected, (state, action) => {
      state.loading = false
      state.bulkimportData = []
      state.error = action.error.message
    })
  },
})

export default FinalTemplateSlice.reducer