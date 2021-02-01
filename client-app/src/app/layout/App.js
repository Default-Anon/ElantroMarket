import NavBar from '../../features/nav/NavBar'
import './App.css';
import ProductDashboard from '../../features/dashboard/ProductDashboard';
import { Route, withRouter, RouteComponentProps, Router,BrowserRouter, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core';
import SignIn from '../../features/user/SignIn'
import SignUp from './../../features/user/SignUp';
import Profile from '../../features/user/Profile';
import ProductEdit from './../../features/product/ProductEdit';
import ProductCategoryes from './../../features/product/ProductCategoryes';
import TVPage from './../pages/category/TVPage';
import TabletPage from '../pages/category/TabletPage';
import ComputersPage from './../pages/category/ComputersPage';
import SmartphonesPage from './../pages/category/SmartphonesPage';
import NotebooksPage from './../pages/category/NotebooksPage';
import ProductPage from './../pages/product/ProductPage';
import Footer from './../../features/nav/Footer';
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Switch>
        <Route exact path='/' component={ProductDashboard} />
        <Route exact path='/account/login' component={SignIn} />
        <Route exact path='/account/register' component={SignUp} />
        <Route exact path='/account/profile' component={Profile} />
        <Route exact path="/product/edit" component={ProductEdit} />
        <Route exact path="/product/category/TV" component={TVPage} />
        <Route exact path="/product/category/Tablets" component={TabletPage} />
        <Route exact path="/product/category/Computers" component={ComputersPage} />
        <Route exact path="/product/category/Smartphones" component={SmartphonesPage} />
        <Route exact path="/product/category/Notebooks" component={NotebooksPage} />
        <Route exact path="/product/id/:id" component={ProductPage} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;