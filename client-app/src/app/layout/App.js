import NavBar from '../../features/nav/NavBar'
import './App.css';
import ProductDashboard from '../../features/dashboard/ProductDashboard';
import { Route, withRouter, RouteComponentProps, Router,BrowserRouter, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core';
import SignIn from '../../features/user/SignIn'
import SignUp from './../../features/user/SignUp';
import Profile from '../../features/user/Profile';
import ProductEdit from './../../features/product/ProductEdit';
function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={ProductDashboard} />
        <Route exact path='/account/login' component={SignIn} />
        <Route exact path='/account/register' component={SignUp} />
        <Route exact path='/account/profile' component={Profile} />
        <Route exact path="/product/edit" component={ProductEdit}/>
      </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;