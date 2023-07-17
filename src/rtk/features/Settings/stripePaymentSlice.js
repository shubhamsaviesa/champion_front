import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'
import { EmailDataPost } from './emailSlice'

const initialState = {
    loading:false,
    stripeData:[],
    error:""
}

export const stripePaymentPost = createAsyncThunk('stripepayment/stripePaymentData',(data)=>{
    return AxiosInstance({
    url:"/stripePayment",
    method:"POST",
    data:data
    }).then(response=>response.data).catch(e=>console.log(e))})

    const stripeSlice = createSlice({
        name:"stripeData",
        initialState,
        extraReducers:builder=>{
        builder.addCase(EmailDataPost.pending,state=>{
            state.loading = true
        }) 
        builder.addCase(EmailDataPost.fulfilled,(state,action)=>{
            state.loading = false
            state.stripeData = action.payload
            state.error = '' 
        })   
        builder.addCase(EmailDataPost.rejected, (state, action) => {
            state.loading = false
            state.stripeData = []
            state.error = action.error.message
          })

        }
    })

    export default stripeSlice.reducer