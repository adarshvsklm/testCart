import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import AddProduct from './Pages/AddProduct';
import ViewProducts from './Pages/ViewProductsPage';
import CartPage from './Pages/CartPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/product/add' element={<AddProduct />} />
          <Route path='/products' element={<ViewProducts />} /> 
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;