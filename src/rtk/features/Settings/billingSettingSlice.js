import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'


const initialState = {
    loading:"",
    billingData:[],
    error:""
}

export const postBillingSetting = createAsyncThunk('billiingSettings/billingSettingData', (formdata)=>{
  return  AxiosInstance({
            url: "/billingSettings",
            method: "POST",
            data: formdata
        }).then(response=>response.data).catch((e)=>(e)) 
    
})

const billingSlice = createSlice({
    name:"billing",
    initialState,
    extraReducers:builder=>{
        builder.addCase(postBillingSetting.pending,state=>{
            state.loading = true
        })
        builder.addCase(postBillingSetting.fulfilled,(state,action)=>{
            state.loading = false
            state.billingData=action.payload
            state.error=""
        })
        builder.addCase(postBillingSetting.rejected,(state,action)=>{
            state.loading=false
            state.billingData=[]
            state=action.error.message
        })
    }
})

export default billingSlice.reducer