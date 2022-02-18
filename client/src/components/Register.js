import React, {useState} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const history = useHistory();

  const register = (e) =>{
    e.preventDefault();
    const { first_name, last_name, username, email, password } = user
    if ( first_name && last_name && username && email && password ){
      axios.post("http://localhost:3001/register", user)
      .then(
        res => {
          console.log(user);
          setUser({
            ...user
          })
        history.push("/")
      }
      ).catch ((err) => {console.log(err);
      alert("invalid input", err)})
    }
  }

  return (
    <div>
      <div>
        Create a new account
      </div>


      <form onSubmit={register} >
        <div>
          <input type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First Name" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <div>
          <input type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last Name" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <div>
          <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <div>
          <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <div>
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."  required/>
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ...">
          Register
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login"> Log in </Link>
      </div>
    </div>
  )
}

export default Register
