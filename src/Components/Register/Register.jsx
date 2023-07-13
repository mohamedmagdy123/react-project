import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import { Link } from 'react-router-dom'

export default function Register() {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
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
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", user)
      setIsLoading(false)
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
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
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(6).max(30).required(),
      rePassword: Joi.string().valid(Joi.ref('password')).required().empty(),
      phone: Joi.string().min(11).max(11).required()
    })

    setIsLoading(false);
    console.log(schema.validate(user, { abortEarly: false }))
    return schema.validate(user, { abortEarly: false })
  }
  return (
    <>
      <h1 className='text-center fw-bold py-2'>Create an account</h1>
      < form className='w-50 mx-auto' onSubmit={submitUserData} >
        <label htmlFor="name">Name</label>
        <input onChange={getUserData} type="text" className='form-control my-input my-2' name='name' id='name' />
        {errorList.map((err, index) => {
          if (err.path[0] === "name") {
            return (
              <p key={index} className='text-danger'>{err.message}</p>
            );
          }
        })}

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

        <label htmlFor="rePassword">re-password</label>
        <input onChange={getUserData} type="password" className='form-control my-input my-2' name='rePassword' id='rePassword' />
        {errorList.map((err, index) => {
          if (err.path[0] === "rePassword") {
            return (
              <p key={index} className='text-danger'>Passwords don't match</p>
            );
          }
        })}

        <label htmlFor="phone">Phone</label>
        <input onChange={getUserData} type="text" className='form-control my-input my-2' name='phone' id='phone' />
        {errorList.map((err, index) => {
          if (err.path[0] === "phone") {
            return (
              <p key={index} className='text-danger'>{err.message}</p>
            );
          }
        })}

        <button type='submit' className='btn btn-info'>{isLoading === true ? <i className='fas fa-spinner fa-spin'></i> : 'sign Up'}</button>
        {error && (
          <p className="text-danger py-2" role="alert">
            {error}
          </p>
        )}
        <p className='pt-2 text-secondary'>Already have an account? <Link className='link-underline-primary' to='/login'> Login</Link></p>
      </form >
    </>
  )


}

