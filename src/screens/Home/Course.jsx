import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Course.css';
import { setCart } from '../../redux/appSlice';
import logo from '../../assets/app_icon.png';
import { useNavigate ,Link} from 'react-router-dom';

import produkt from '../products';
const Courses = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const cart = useSelector((state) => state.app.cart);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const userName = useSelector((state) => state.app.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

 useEffect(() => {
    setProducts(produkt);
  }, []);

 

  const handleAddToCart = (course) => {
    if (cart) {
      setSelectedCourse(course);
      setShowCourseModal(!showCourseModal);
      setShowPopup(true);
    } else {
      dispatch(setCart(course));
      alert(`${course.title} added to cart`);
    }
  };
const adjustTextColor = (imgElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;
  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let rTotal = 0,
    gTotal = 0,
    bTotal = 0;
  let pixelCount = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    rTotal += imageData[i]; // Red
    gTotal += imageData[i + 1]; // Green
    bTotal += imageData[i + 2]; // Blue
    pixelCount++;
  }

  // Calculate average brightness
  const avgR = rTotal / pixelCount;
  const avgG = gTotal / pixelCount;
  const avgB = bTotal / pixelCount;

  // Perceived brightness formula (better contrast detection)
  const brightness = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB);

  // Set text color: Dark images → White text, Bright images → Black text
  const textColor = brightness < 128 ? "white" : "black";

  // Apply the color to the overlay text
  const overlay = imgElement.nextElementSibling;
  if (overlay) {
    console.log(textColor)
    overlay.style.color = textColor;
  }
};


  const handleTerms = () => {
    navigate('/terms&conditions');
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy');
  };

  const handleContactUs = () => {
    navigate('/contactus')
  };
  const handleRefundPolicy = () => {
    navigate('/Refund-policy');
  };
  const confirmReplace = () => {
    dispatch(setCart(selectedCourse));
    setShowPopup(false);
    alert(`${selectedCourse.title} added to cart`);
  };

  const cancelReplace = () => {
    setShowPopup(false);
  };

 
  const closeCourseModal = () => {
    setShowCourseModal(false);
  };

  const goToCart = () => {
    if (cart) {
      navigate('/c');
    } else {
      setShowCartPopup(true);
    }
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };


  return (
    <div className="main-container">
      <header className="header" style={{ backgroundColor: 'lightSkyBlue' }}>
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">Telemoni</h1>
        </div>
        <div className="login-icon">
          {isLoggedIn ? (
            <span className="user-name">{userName}</span>
          ) : (
            <button className="login-button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>
      
     <div className="courses-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.image}
            alt={product.name}
            onContextMenu={(e) => e.preventDefault()} // Prevent right-click download
            className="product-image"
            onLoad={(e) => adjustTextColor(e.target)}
          />
          {/* Overlay positioned at the bottom */}
          <div className="overlay">
            <div className="info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="actions">
              <Link to={`/c/${product.id}`} className="view-button">
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

      <footer className="footer">
        <span className="footer-link" onClick={handleTerms}>Terms and Conditions</span>
        <span className="footer-link" onClick={handlePrivacyPolicy}>Privacy Policy</span>
        <span className="footer-link" onClick={handleContactUs}>Contact Us</span>
        <span className="footer-link" onClick={handleRefundPolicy}>Refund Policy</span>
      </footer>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>An item is already in the cart. Do you want to replace it?</p>
            <button onClick={confirmReplace} className="popup-btn confirm">OK</button>
            <button onClick={cancelReplace} className="popup-btn cancel">Cancel</button>
          </div>
        </div>
      )}

      {showCourseModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeCourseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCourse.image} alt={selectedCourse.title} className="modal-image" />
            <div className="course-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="course-title">{selectedCourse.title}</div>
              <div className="course-price">₹{selectedCourse.price}</div>
            </div>
            <p className="modal-author">Author: {selectedCourse.author}</p>
            <p className="modal-description">
              {selectedCourse.crse}
            </p>
            <button onClick={() => handleAddToCart(selectedCourse)} className="modal-add-to-cart-btn">
              Add to Cart
            </button>
            <button onClick={closeCourseModal} className="modal-close-btn">Close</button>
          </div>
        </div>
      )}

      {showCartPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Add an item to proceed to the cart</p>
            <button onClick={closeCartPopup} className="popup-btn confirm">OK</button>
          </div>
        </div>
      )}

      <div className="cart-icon" onClick={goToCart}>🛒</div>

      
    </div>
  );
};


export default Courses;
