import React, { useEffect, useState } from 'react'
import '../../style/Account/resetpassword.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../../rtk/features/auth/authSlice'



export const ResetPassword = () => {
  const initialValue = {
    npassword: "",
    cpassword: ""
  }

  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState(initialValue)
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // console.log("tewst reset",user)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  const handleSignup = () => {
    Navigate('/signup')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const resetObj={}
    Object.assign(resetObj,{formValue,user:user})
    console.log("resetObj",resetObj)
    // dispatch(resetPassword(formValue))
  }

  return (
    <>
      <div className='imagebackgroundforlogin'>
        <div className='signinform'>
          <div className='topcontaint'>
            <h1 className='resetpasswordheader'>Reset your Password</h1>
            <p className='subheaderparagraph'></p>
          </div>

          <Form onSubmit={handleSubmit}>

            <div className='formInput'>
              <div className='forminputdiv'> <span style={{ fontSize: "1.4rem" }}><BsLockFill />|</span> <input className='inputforaccountpage' type='password' name="npassword" placeholder='New password' value={formValue.npassword} onChange={handleInput} /></div>
            </div>
            <div className='formInput'>
              <div className='forminputdiv'> <span style={{ fontSize: "1.5rem" }}><BsLockFill />|</span> <input className='inputforaccountpage' type='password' name='cpassword' placeholder='Confirm password' value={formValue.cpassword} onChange={handleInput} />  </div>
            </div>

            <Button className='formsubmitbutton' type="submit" >
              SUBMIT
            </Button>
            <Button className="signuponloginonreset" onClick={handleSignup}>SIGN UP</Button>
          </Form>

        </div>
      </div>
    </>
  )
}

