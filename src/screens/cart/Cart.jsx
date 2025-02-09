import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './cart.css';
import logo from '../../assets/app_icon.png';
import telegram from '../../assets/telegram.jpg';
import { getProduct } from '../../utils/getapi';
import { apiClient, endpoints } from '../../utils/endpoints';
import HeaderWithHover from '../HeaderWithHover';
import products from '../products';

const CartPage = () => {
  const { link } = useParams();
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null && token !== '';
  const userName = useSelector((state) => state.app.name);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
 const [showModal, setShowModal] = useState(false);  const [paymentUrl, setPaymentUrl] = useState('');
const iframeRef = useRef(null);
  const fetchProduct = async () => {
    try {
      if (link && link.length!=6) {
        setLoading(true);
        const response = await getProduct(link);
        console.log(response);
        if (response) {
          setProduct(response.data);
        }
        setLoading(false);
      }else{  setProduct( products.find((product) => product.id === link));
  }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product data");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!product) {
        fetchProduct();
      } else {
        clearInterval(intervalId); // Stop fetching once product is loaded
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [link, product]);

  const handleLogin = () => {
    navigate('/login');
  };

   const handlePayClick = async () => {
    if (token) {
      try {
        const response = await apiClient.post(
          endpoints.getPayemntLink,
          { link },
          { headers: { Authorization: token } }
        );
        
        if (response.data && response.data.url) {
window.location.replace(response.data.url)          // setShowModal(true); // Open the modal
        } else {
          alert("Transaction initiation failed");
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
      navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentUrl(null);
  };

  const handleIframeLoad = () => {
    if (paymentUrl && iframeRef.current) {
      const iframeLocation = iframeRef.current.contentWindow.location.href;

      // Check if the iframe has redirected to the success URL
      if (iframeLocation.includes('/redirect-url')) {
        setShowModal(false);
        setPaymentUrl(null);
        navigate('/success');
      }
    }
  };
  
  return (
    <div className="cart-page">
      <header className="header" style={{ backgroundColor: 'lightSkyBlue' }}>
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">Telemoni</h1>
        </div>
        <div className="login-icon">
          {isLoggedIn ? (
<HeaderWithHover name={userName} token={token} />
          ) : (
            <button className="login-button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>

      {loading ? <div className="cart-content">
              <h3>...loading</h3>
            </div> : (
        <div className="cart-container">
       {link && link.length === 6 ? (
  <>
    {product ? (
     <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        <b>Author:</b> {product.author}
      </p>

      {/* Image Preview Section */}
      <div className="image-preview">
        <div className="image-slider">
          {product.images.map((img, index) => (
            <div key={index} className="image-container">
              <img
                src={img}
                alt={`Preview ${index}`}
                onContextMenu={(e) => e.preventDefault()} // Disable Right-Click
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pay Button */}
      <button onClick={() => navigate(`/purchase/${product.id}`)}>
        Pay {product.price}
      </button>
    </div>
    ) : (
      <p>...loading</p>
    )}
  </>
) : link !== '' && product ? (
  product.displaytext ? (
    <div className="product-info-container">
      <div className="product-info">
        {product.type === "telegram" && (
          <img src={telegram} alt="Telegram" className="channel-icon" />
        )}
        <h1>{product.channel_name}</h1>
      </div>
      <div className="product-details">
        <h2>About Channel:</h2>
        <p>{product.displaytext}</p>
        <div className="price-section">
          <h3>Subscription Plan</h3>
          <p>{product.ppu} for {product.for}</p>
        <button className="pay-btn" onClick={handlePayClick}>
          Pay {product.ppu}
        </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div><h2>{product.channel_name}</h2></div>
      <button className="pay-btn" onClick={handlePayClick}>
        Pay {product.ppu}
      </button>
    </div>
  )
) : (
  <div className="cart-content">
    <h3>...loading</h3>
  </div>
)}
<footer className="footer">
        <span className="footer-link" onClick={() => navigate('/terms&conditions')}>Terms & Conditions</span>
        <span className="footer-link" onClick={() => navigate('/privacy-policy')}>Privacy Policy</span>
        <span className="footer-link" onClick={() => navigate('/contactus')}>Contact Us</span>
                <span className="footer-link" onClick={() => navigate('/AboutUs')}>About us</span>

      </footer>
        </div>
      )}

      

      {/* Payment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <iframe
              src={paymentUrl}
              onLoad={handleIframeLoad}
              ref={iframeRef}
              className="modal-iframe"
              title="Payment"
            ></iframe>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
