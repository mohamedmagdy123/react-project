import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Joi from 'joi'

export default function Login() {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [errorList, setErrorList] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }


  async function sendUserDataToApi() {
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", user)
      setIsLoading(false)
      navigate('/home')
    } catch (error) {
      setError(error.response.data.message)
      console.log(error.response.data.message);
    }
  }


  function submitUserData(e) {
    setIsLoading(true)
    e.preventDefault()
    let validation = validateUserData()
    if (validation.error === undefined) {
      setIsLoading(false)
      sendUserDataToApi()
    } else {
      setIsLoading(false)
      setErrorList(validation.error.details)
    }
  }
  function validateUserData() {
    let schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(6).max(30).required(),
    })
    setIsLoading(false);
    console.log(schema.validate(user, { abortEarly: false }))
    return schema.validate(user, { abortEarly: false })
  }
  return (
    <>
      <div className='text-center pt-5 pb-3'>
        <h1 className='fw-bold'>Welcome Back!</h1>
        <p className='text-secondary'>We're so excited to see you again!</p>
      </div>
      <form className='w-50 mx-auto' onSubmit={submitUserData} >
        <label htmlFor="email">Email</label>
        <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
        {errorList.map((err, index) => {
          if (err.path[0] === "email") {
            return (
              <p key={index} className='text-danger'>{err.message}</p>
            );
          }
        })}
        <label htmlFor="password">Password</label>
        <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />
        {errorList.map((err, index) => {
          if (err.path[0] === "password") {
            return (
              <p key={index} className='text-danger'>{err.message}</p>
            );
          }
        })}
        <button type='submit' className='btn btn-info'>{isLoading === true ? <i className='fas fa-spinner fa-spin'></i> : 'sign in'}</button>
        {error && (
          <p className="text-danger py-2" role="alert">
            {error}
          </p>
        )}
        <p className='pt-2 text-secondary'>Don't have an account? <Link className='link-underline-primary' to='/'>Sign Up</Link></p>
      </form >

    </>
  )


}

