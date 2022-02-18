import '../App.css'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import BookDetail from './BookDetail'
import BookList from './BookList'
import CreateBook from './CreateBook'
import UpdateBook from './UpdateBook'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import {useState} from 'react'


function App() {
  const [user, setLoginUser] = useState({

  })
  return (
    <div className="App">

        <Router>

          <nav>
            <Link to="/">Home | </Link>
            {
              user && user._id ?
                <Link to="/books"> Your Library |</Link>
                : <Link to="/register">Sign up |</Link>
            }
            {
              user && user._id ?
                <Link to="/create-book"> Add to your library </Link>
                : <Link to="/login"> Log in</Link>
            }

          </nav>
          { user && user._id  ?
            <h1>{user.username}'s Library</h1>
          :
            <h1>The Library</h1>
          }

          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/books">
              {
                user && user._id ? <BookList />:<Login setLoginUser={setLoginUser}/>
              } </Route>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={()=><Login setLoginUser={setLoginUser} />}/>
            </Switch>

              <Route exact path="/create-book" component={CreateBook}/>
              <Route exact path="/edit-book/:id" component={UpdateBook}/>
              <Route exact path="/books/:id" component={BookDetail}/>

          </div>


        </Router>



    </div>
  );
}

export default App;
