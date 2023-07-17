import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import AxiosInstance from '../../../Api/AxiosInstance'


const initialState = {
    loading: false,
    emailData:[],
    error:""
}

export const EmailDataPost = createAsyncThunk("email/emailData",(formData)=>{
return AxiosInstance({
url:"/emailsettingpost",
method:"POST",
data:formData
}).then(response=>response.data).catch((e)=>{console.log(e)})
})

const emailDataSlice = createSlice({
    name:"emailData",
    initialState,
    extraReducers:builder=>{
        builder.addCase(EmailDataPost.pending, state => {
            state.loading = true
          })
          builder.addCase(EmailDataPost.fulfilled, (state, action) => {
            state.loading = false
            state.emailData = action.payload
            state.error = ''
          })
          builder.addCase(EmailDataPost.rejected, (state, action) => {
            state.loading = false
            state.emailData = []
            state.error = action.error.message
          })
    }
})

export default emailDataSlice.reducer