import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/global/HomePage';
import Cart from './pages/global/Cart';
import { ContactUs } from './pages/global/ContactUs';
import Shops from './pages/global/Shops';
import SingleProduct from './pages/global/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainCategories from './pages/admin/MaintainCategories';
import MaintainShops from './pages/admin/MaintainShops';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { NotFound } from './pages/global/NotFound';
import Supplier from './pages/admin/Supplier';
import NavigationBar from './components/NavigationBar';

function App() {

  return (
    <div className="App">

     <NavigationBar />
     
     <Routes>
      <Route path="" element={ <HomePage /> } />
      <Route path="cart" element={ <Cart /> } />
      <Route path="contact" element={ <ContactUs /> } />
      <Route path="shops" element={ <Shops /> } />
      <Route path="product/:product_id" element={ <SingleProduct /> } />
      <Route path="admin" element={ <AdminHome /> } />
      <Route path="admin/add" element={ <AddProduct /> } />
      <Route path="admin/edit/:product_id" element={ <EditProduct /> } />
      <Route path="admin/products" element={ <MaintainProducts /> } />
      <Route path="admin/categories" element={ <MaintainCategories /> } />
      <Route path="admin/shops" element={ <MaintainShops /> } />
      <Route path="admin/supplier" element={ <Supplier /> } />
      <Route path="login" element={ <Login /> } />
      <Route path="signup" element={ <Signup /> } />
      <Route path="*" element={ <NotFound /> } />
     </Routes>
    </div>
  );
}

export default App;
