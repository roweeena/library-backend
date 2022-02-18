import React, {useState} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom';

const Login = ({setLoginUser}) => {
  const [user, setUser] = useState({
    email: "",
    password:""
  })

  const history = useHistory();
  console.log(history, "history")

  const handleChange = (e) =>{
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const login = (e) =>{
    e.preventDefault()
    console.log(('click'));
    axios.post("http://localhost:3001/login", user)
      .then(
        res =>
         {
           console.log("id", res.data.user._id)
          setLoginUser(res.data.user)
          history.push("/books")

        }
      )
      .catch((err) =>{
        console.log(err);
      })
    }
  return (

    <div>
      <form onSubmit={login}>
        <div>
          <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <div>
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ...">
          Log in
        </button>
      </form>
      <div>
        Don't have an account? Sign up <Link to="/register">here</Link>
      </div>
    </div>
  )
}

export default Login
