// App.jsx
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './redux/appSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CartPage from './screens/cart/Cart';
import LoginPage from './Log/Login';
import Privacy from './policies/Privacy';
import TermsAndConditions from './policies/Terms'
import RefundPolicy from './policies/RefundPolicy';
import ContactUs from './policies/Contactus';
import Succes from './screens/Success';
import Courses from './screens/Home/Course';

import InputScreen from './screens/InputScreen';
import TransactionExtractor from './screens/TransactionExtractor';
import PurchasePage from './screens/cart/purchase';
import About from './screens/About';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  return (
    <Router>
      <Routes>
                <Route path="/failed" element={<TransactionExtractor />} />

        <Route path="/" element={<Courses />} />
        <Route path="/c/:link?" element={<CartPage />} />
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/purchase/:id" element={<PurchasePage />} />
        <Route path='/getlink' element={<InputScreen/>}/>
        <Route path="/redirect-url" element={<Succes />} />
        <Route path="/redirect-url/:transId" element={<Succes />} />
        <Route path='/privacy-policy' element={<Privacy/>}/>
        <Route path='/terms&conditions' element={<TermsAndConditions/>}/>
        <Route path='/Refund-policy' element={<RefundPolicy/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
      </Routes>
    </Router>
  );
};

export default App;
