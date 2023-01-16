import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import Login from './pages/LoginPage/LoginPage';
import Register from './pages/RegisterPage/RegisterPage';
import Cart from './pages/CartPage/CartPage'
import AddProduct from './pages/AddProductPage/AddProductPage';
import ProductList from './pages/ProductListPage/ProductListPage';
import UserProfile from './pages/UserProfilePage/UserProfilePage';
import Checkout from './pages/CheckoutPage/CheckoutPage'
import SpecificProduct from './pages/SpecificProduct/SpecificProduct';
import NotFound from './pages/FOFPage/FOFPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/addproduct" element={<AddProduct />} />

        <Route exact path="/product-type/mobiles" element={<ProductList type={'Mobile'} />} />
        <Route exact path="/product-type/laptops" element={<ProductList type={'Laptop'} />} />
        <Route exact path="/product-type/books" element={<ProductList type={'Book'} />} />
        <Route exact path="/product-type/fashion" element={<ProductList type={'Fashion'} />} />
    
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route path="/product/:id/:type" element={<SpecificProduct />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
