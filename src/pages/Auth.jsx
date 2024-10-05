import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {
  const registerForm = register ? true : false;
  //UseNavigate() hook is used to redirect to a particular path
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning('Please fill the form completely')
    } else {
      const result = await registerApi(userData)
      if (result.status == 201) {
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        toast.success(`${username} registered successfully`)
        //navigate to login page on successfull user registeration
        navigate('/login')
      }
      else if (result.status == 400) {
        toast.error(result.response.data)
      }
      else {
        toast.error("Somthing happened")
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning('Please fill the form completely')
    } else {
      const result = await loginApi(userData)
      console.log("login result");
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("loggedUser", JSON.stringify(result.data.data))
        sessionStorage.setItem("token", result.data.token)        
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        toast.success('User logged in successfully')
        navigate('/')
      } else if (result.status == 401) {
        toast.error("Invalid Email or Password")
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='container w-75'>
          <h5>
            <Link to={'/'} className='text-warning' style={{ textDecoration: "none", fontWeight: "bolder" }}><i class="fa-solid fa-arrow-left me-3"></i>BACK TO HOME</Link>
          </h5>
          <div className='bg-success rounded'>
            <Row>
              <Col md={6} className='p-4 d-flex justify-content-center align-items-center' >
                <img width="70%" src="https://imgs.search.brave.com/P6mWt247lAnsL-z60lBDbonQT17ZY40khTDiqAZrWvw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/aWVzLmZyZWVwaWts/YWJzLmNvbS9zdG9y/YWdlLzQyODgvTG9n/aW4tMDEuc3Zn" alt="" />
              </Col>
              <Col md={6} className='p-5 d-flex justify-content-center'>
                <form className='w-100'>
                  <h5 className='text-center'><i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h5>
                  {
                    registerForm ?
                      <>
                        <h6 className='text-center mb-3 mt-3'>Sign Up To Your Account</h6>
                        <input type="text" placeholder='Name' className='form-control rounded' value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                      </> :
                      <h6 className='text-center mb-3 mt-3'>Sign In To Your Account</h6>
                  }
                  <div className='mb-3 mt-3'>
                    <input type="text" placeholder='Email Id' className='form-control rounded' value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  </div>
                  <div className='mb-3'>
                    <input type="password" placeholder='Password' className='form-control rounded' value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                  </div>
                  {
                    registerForm ?
                      <div className='mt-3 mb-3'>
                        <button className='btn btn-warning w-100 rounded' onClick={handleRegister}>REGISTER</button>
                        <p className='mt-3 me-3'>Already A User ? Click Here To <Link to={'/login'} style={{ textDecoration: "none", color: "white" }}>LOGIN</Link></p>
                      </div> :
                      <div>
                        <button className='btn btn-warning w-100 rounded' onClick={handleLogin}>LOGIN</button>
                        <p className='mt-3 me-3'>Not Register Yet ? Click Here To <Link to={'/register'} style={{ textDecoration: "none", color: "white" }}>REGISTER</Link></p>
                      </div>
                  }
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth