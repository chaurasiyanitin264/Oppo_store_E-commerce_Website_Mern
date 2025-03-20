import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import WEB_URL from "../config";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { PiCurrencyInr } from "react-icons/pi";
import { FaMoneyCheck } from "react-icons/fa";
import { qntyIncrease, qntyDecrease, productRemove } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/cart.css";

const Cart = () => {
  const proData = useSelector(state => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  
  let totalAmount = 0;
  
  useEffect(() => {
    setIsCartEmpty(proData.length === 0);
    // Add animation class to newly added items
    const timer = setTimeout(() => {
      const items = document.querySelectorAll('.cart-item');
      items.forEach(item => {
        item.classList.add('show');
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [proData]);
  
  const handleQuantityChange = (id, action) => {
    if (action === 'increase') {
      dispatch(qntyIncrease({id}));
    } else {
      dispatch(qntyDecrease({id}));
    }
    
    // Add pulse animation to price
    const priceElement = document.getElementById(`total-price-${id}`);
    if (priceElement) {
      priceElement.classList.add('price-update');
      setTimeout(() => {
        priceElement.classList.remove('price-update');
      }, 500);
    }
  };
  
  const handleRemove = (id) => {
    const item = document.getElementById(`cart-item-${id}`);
    if (item) {
      item.classList.add('remove-animation');
      setTimeout(() => {
        dispatch(productRemove({id}));
      }, 300);
    } else {
      dispatch(productRemove({id}));
    }
  };

  const cartItems = proData.map((item) => {
    totalAmount += item.price * item.qnty;
    return (
      <tr key={item.id} id={`cart-item-${item.id}`} className="cart-item">
        <td className="product-image">
          <div className="img-wrapper">
            <img src={`${WEB_URL}/${item.defaultImage}`} alt={item.name} />
          </div>
        </td>
        <td className="product-name">{item.name}</td>
        <td className="product-brand">{item.brand}</td>
        <td className="product-desc">{item.description}</td>
        <td className="product-price">
          <div className="price-container">
            <PiCurrencyInr className="currency-icon" />
            <span>{item.price.toLocaleString()}</span>
          </div>
        </td>
        <td className="product-quantity">
          <div className="quantity-controls">
            <Button 
              variant="light" 
              className="quantity-btn decrease" 
              onClick={() => handleQuantityChange(item.id, 'decrease')}
              disabled={item.qnty <= 1}
            >
              <FaMinusCircle />
            </Button>
            <span className="quantity-value">{item.qnty}</span>
            <Button 
              variant="light" 
              className="quantity-btn increase" 
              onClick={() => handleQuantityChange(item.id, 'increase')}
            >
              <FaPlusCircle />
            </Button>
          </div>
        </td>
        <td className="product-total" id={`total-price-${item.id}`}>
          <div className="price-container">
            <PiCurrencyInr className="currency-icon" />
            <span>{(item.price * item.qnty).toLocaleString()}</span>
          </div>
        </td>
        <td className="product-actions">
          <Button 
            variant="danger" 
            className="remove-btn" 
            onClick={() => handleRemove(item.id)}
          >
            <FaTrashAlt /> Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="cart-container" style={{marginTop:"50px"}}>
      <div className="cart-header">
        <h2><FaShoppingCart className="cart-icon" /> Shopping Cart</h2>
        <div className="cart-summary">
          <div className="total-amount">
            <span>Total:</span>
            <div className="amount">
              <PiCurrencyInr className="currency-icon" />
              <span>{totalAmount.toLocaleString()}</span>
            </div>
          </div>
          <Button 
            variant="success" 
            className="checkout-btn" 
            onClick={() => {navigate("/checkout")}}
            disabled={isCartEmpty}
          >
            <FaMoneyCheck className="checkout-icon" /> Proceed to Checkout
          </Button>
        </div>
      </div>

      {isCartEmpty ? (
        <div className="empty-cart">
          <FaShoppingCart className="empty-cart-icon" />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Button variant="primary" onClick={() => navigate("/home")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="table-container" >
          <Table hover className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Cart;