import React, { useState, useEffect } from 'react'
import '../../style/Account/forgetpassword.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GrMail } from 'react-icons/gr';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux'
//import { ForgetPasswordotp , Verifyotp} from '../../../rtk/features/user/userSlice';
import { getOtp, verifyOtp } from '../../../rtk/features/auth/authSlice'
import Otpinput from './OtpInput';
import { toast } from 'react-toastify';
import _ from 'lodash'

const Dialog1 = styled(Dialog)`& div > div{left:2%;border-radius:30px}`

const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        mobilenumber: '',
    })

    const { mobilenumber } = formData
    const [otpdata, setOtpData] = useState('')
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [verfyotpValue, setVerfyotpValue] = useState('')
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    console.log("user", user)

    const handleSignup = () => {
        Navigate('/signup')
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
    }, [dispatch])


    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            mobilenumber,
        }
        // have to do validation on mobile number
        dispatch(getOtp(userData))
        handleClickOpen()
  }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const InputVerifyOtpHandle = (e) => {
        const { name, value } = e.target;
        setVerfyotpValue({ ...verfyotpValue, [name]: value });
    }

    const getChildOtp = (data) => {
        setOtpData(data)
    }

    const veriFyOtpHandle = (e) => {
        e.preventDefault()
        dispatch(verifyOtp({ otpCode: otpdata, mobilenumber: user.user.mobilenumber }))
        Navigate('/resetpassword')
        console.log("from veriy", user.user)
        // if (user.user) {
        //     if (!_.isEmpty(user.user) && user.user.status === 'success') {
        //         console.log("veify", user.status)
        //         Navigate('/resetpassword')
        //         handleClose()
        //     }
        // } else {
        //     toast.warn("Invalid OTP")
        //     handleClose()
        // }
    }

    return (
        <>
            <div className='imagebackgroundforlogin'>
                <div className='signinform'>
                    <div className='topcontaint'>
                        <h1 className='forgetpasswordheader'>Forget Password</h1>
                        <p className='subheaderparagraphonforget'>Please enter the e-mail address or mobile number used while creating your account,we'll send you instruction to reset your password</p>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <div className='formInputonforget'>
                            <div className='forminputdiv'> <span style={{ fontSize: "1.4rem" }}></span>
                                <input className='inputforaccountpage'
                                    type='number'
                                    value={mobilenumber}
                                    name="mobilenumber"
                                    onChange={onChange}
                                    placeholder='Email or mobile number' required />
                            </div>
                        </div>
                        <Button className='formsubmitbutton' type='submit'>
                            GET OTP
                        </Button>
                        <Button className="signuponloginonforget" onClick={handleSignup}>SIGN UP</Button>
                    </Form>
                    <Dialog1
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title"  >
                        </DialogTitle>
                        <DialogContent  >
                            <DialogContentText id="alert-dialog-description" >
                                <div className='otpContainer' style={{ borderRadius: "20px" }}>
                                    <div className='otpMailIcon'><GrMail /></div>
                                    <div className='otpText' style={{ fontWeight: "bold", fontSize: "20px" }}>OTP Verification</div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Otpinput getChildOtp={getChildOtp} />
                                    </div>
                                    <div><Button onClick={veriFyOtpHandle} variant="contained" style={{ background: "#13A74B", color: "white" }}>VERIFY</Button></div>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog1>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword