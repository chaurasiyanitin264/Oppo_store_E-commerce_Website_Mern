import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import WEB_URL from "../config";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";

import Carousel from 'react-bootstrap/Carousel';
import AutoPlayVideo from './AutoPlayVideo';

import { useContext } from "react";




import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import { LoginContext } from '../LoginContext';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    // Optional: Add event listener for window resizing
    window.addEventListener('resize', AOS.refresh);
    return () => window.removeEventListener('resize', AOS.refresh);
  }, []);

  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadData = () => {
    let api = `${WEB_URL}/product/displayproduct`;
    axios.get(api).then((res) => {
      setMydata(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFullProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };

  const { setIsLogedIn } = useContext(LoginContext);
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${WEB_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    localStorage.setItem("userid", response.data._id);
    localStorage.setItem("username", response.data.name);
    setIsLogedIn(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);

  const ans = mydata.map((key) => {
    return (
      <div data-aos="fade-up" style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "20px",
          boxSizing: "border-box",
          borderRadius: "10px", // Rounded corners for a modern feel
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow effect
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
        }}
        className="product-card"
      >
        <div className="image-container" style={{ position: "relative", backgroundColor: "#E0E8EA", borderRadius: "10px 10px 0 0" }}>
          <img
            src={`${WEB_URL}/${key.defaultImage}`}
            alt={key.name}
            className="product-image"
            onClick={() => showFullProduct(key._id)}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px 10px 0 0", // Ensure image has rounded corners
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
        <Card.Body style={{ display: "flex", justifyContent: "space-between", padding: "15px", borderRadius: "0 0 10px 10px" }}>
          <div>
            <Card.Text style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.5" }}>
              {/* {key.description || "No description available."} */}
              <br />
              <span style={{ fontWeight: "bold", color: "#000", fontSize: "20px" }}>
                ₹ {key.price}/-
              </span>
            </Card.Text>
          </div>
          <button
            className="add-to-cart"
            style={{
              backgroundColor: "#28a745", // Brighter green for a fresh look
              color: "#fff",
              border: "none",
              padding: "12px 18px", // Slightly larger padding
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px", // Increased font size for better readability
              fontWeight: "bold",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onClick={() => {
              dispatch(
                addtoCart({
                  id: key._id,
                  name: key.name,
                  brand: key.brand,
                  price: key.price,
                  description: key.description,
                  category: key.category,
                  subcategory: key.subcategory,
                  images: key.images,
                  defaultImage: key.defaultImage,
                  ratings: key.ratings,
                  status: key.status,
                  qnty: 1,
                })
              );
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"} // Darker green on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"} // Reset to original green
          >
            Buy Now
          </button>
        </Card.Body>
      </Card>
    </div>
    
    );
  });

  return (
    <>
      

      <Carousel style={{  border: "1px solid blue", marginBottom: "10px", marginTop: "1px" }} data-aos="fade-down">
        <Carousel.Item >
          {/* <img src={C}   className="caro" /> */}
          {/* width="100%" height="450" */}
          <Carousel.Caption>
            <h1>OPPO Reno13 Pro 5G</h1>
            <h4>AL LivePhoto | AL Clarity</h4>
            <h4>UnderWater Photography with IP 68 & IP 69</h4>
            <Button style={{ marginRight: "20px", backgroundColor: "white", color: "black" }}>Learn more</Button>
            <Button variant="primary">Buy Now</Button>
          </Carousel.Caption>
        </Carousel.Item>
        {/* More Carousel.Items as needed */}
      </Carousel>

      <div className='video' style={{ margin: "10px", borderRadius: "1%", backgroundColor: "#E0E8EA" }} data-aos="fade-up">
        <AutoPlayVideo />
      </div>

      <div>
        <center data-aos="fade-up">
          <h3 >New Product</h3>
        </center>
      </div>
      <div className='product-list' data-aos="fade-down">
        {ans}
      </div>
    </>
  );
};

export default Home;
