import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import WEB_URL from "../config";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";

import Carousel from 'react-bootstrap/Carousel';
import coro2 from "../images/mob.png";
import coro1 from "../images/Screenshot 2025-03-28 230751.png";
import coro from "../images/Screenshot 2025-03-28 230348.png";
import AutoPlayVideo from './AutoPlayVideo';

import { useContext } from "react";




import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import { LoginContext } from '../LoginContext';
import Allcategory from './Allcategory';


const Home = () => {


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    
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
          borderRadius: "10px", 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
          transition: "transform 0.3s ease, box-shadow 0.3s ease", 
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
              borderRadius: "10px 10px 0 0", 
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
              backgroundColor: "#28a745", 
              color: "#fff",
              border: "none",
              padding: "12px 18px", 
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px", 
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
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"} 
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"} 
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
         <div className='video' style={{ margin: "-1px", backgroundColor: "#E0E8EA",padding:"10px" }} data-aos="fade-up">
        <AutoPlayVideo />
      </div>
      <div
  style={{
    display: "flex",
    justifyContent: "center", // Horizontally center
    alignItems: "center", // Vertically center
   
  }}
>
  <div
    style={{
      fontSize: "24px",
      fontWeight: "bold",
      color: "#ff5722",
      textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
      letterSpacing: "2px",
      // padding: "10px 20px",
      background: "linear-gradient(to right, #ff9966, #ff5e62)",
      borderRadius: "8px",
      textAlign: "center",
      animation: "pulse 1.5s infinite alternate",
    }}
  >
    New Arrivals
  </div>
</div>



      <div style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
        <div>
          <img src={coro} alt="" style={{marginBottom:"10px"}} />
        </div>
        <div>
          <img src={coro1} alt="" style={{marginBottom:"10px"}} />
        </div>
        <div>
          <img src={coro2} alt="" style={{marginBottom:"10px"}}/>
        </div>
      {/* <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={coro} alt="First Slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={coro1} alt="Second Slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={coro2} alt="Third Slide" />
        </Carousel.Item>
      </Carousel> */}
    </div>



    
  


   

      <div>
      <Allcategory/>
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
