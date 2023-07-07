import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
  const [isLoading, setisLoading] = useState(false)


  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }


  async function sendUserDataToApi() {
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", user);
      setisLoading(false)
      navigate('/login')
    } catch (e) {
      setisLoading(false);
      setError(e.response.data.errors.param + ': ' + e.response.data.errors.msg);
    }

  }

  function submitUserData(e) {
    setisLoading(true)
    e.preventDefault()
    sendUserDataToApi()
  }
  return (
    <>
      {error.length > 0 ? <div className='alert alert-danger'>{error}</div> : ''}
      <form onSubmit={submitUserData} >
        <label htmlFor="name">Name</label>
        <input onChange={getUserData} type="text" className='form-control my-input my-2' name='name' id='name' />
        <label htmlFor="email">Email</label>
        <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
        <label htmlFor="password">Password</label>
        <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />
        <label htmlFor="rePassword">re-password</label>
        <input onChange={getUserData} type="password" className='form-control my-input my-2' name='rePassword' id='rePassword' />
        <label htmlFor="phone">Phone</label>
        <input onChange={getUserData} type="text" className='form-control my-input my-2' name='phone' id='phone' />
        <button type='submit' className='btn btn-info'>{isLoading == true ? <i className='fas fa-spinner fa-spin'></i> : 'sign Up'}</button>


      </form>
    </>
  )


}
