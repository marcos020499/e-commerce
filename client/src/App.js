import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Cart from './Pages/cart'
import React, { useState } from 'react';
import createProduct from './Pages/createProduct'
import productDetails from './Pages/productDetails'
import productFilter from './Pages/filter'
import NavBar from './Components/navBar/index';
import Footer from './Components/footer/index'
import Store from './stores'
import categories from './Pages/categories/categories';
import categoriesFilter from './Pages/categories/filter';
import phoneInput from './Components/phone/inputPhone';
function App() {
  const [theme, setTheme] = useState('buttonTrue');
  const change =() => setTheme(theme =>! theme)
  return (
    <Provider store={Store}>
      <div className={theme?'buttonTrue' : 'buttonFalse'}>
        <span href='/' className='iconChange'><i className='fa fa-adjust' onClick={change}></i></span>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/products/create' component={createProduct}/>
          <Route exact path='/products/editar/:id' component={createProduct}/>
          <Route exact path='/products/details/:id' component={productDetails}/>
          <Route exact path='/filter/:name' component={productFilter}/>
          <Route exact path='/categories' component={categories}/>
          <Route exact path='/categories/:categories' component={categoriesFilter}/>
          <Route exact='/phoneInput/:name' component={phoneInput}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
      </div>
    </Provider>
  );
}
export default App;
