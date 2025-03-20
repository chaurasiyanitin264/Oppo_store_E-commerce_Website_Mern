import React, { useEffect, useState } from "react";
import axios from "axios";
import WEB_URL from "../config";
import { Card } from "react-bootstrap"; // Assuming you're using React Bootstrap for Card
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";

const Tablet = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // Load audio products from the API
  const loadData = async () => {
    try {
      const api = `${WEB_URL}/product/tablet?category=Tablets`;
      const response = await axios.get(api);
      console.log(response.data);  // Debugging: Ensure the API response is correct
      setData(response.data);      // Set data after response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFullProduct = (productId) => {
    // Handle showing the full product details when the image is clicked
    console.log("Showing full details for product:", productId);
    // You can add routing or modal display logic here if needed
  };

  const ans = data.map((key) => {
    return (
      <div style={{ marginTop:"90px",display: "flex", justifyContent: "center", margin: "20px" }}>
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

  return(
    <>
    <center>
    <div style={{marginTop:"90px"}}>
      <div style={{fontSize:"24px",fontWeight: "bold",marginBottom:"10px" }}>Latest OPPO Tablets</div>
      Explore the latest tablets from OPPO India.
    </div>
    </center>
     <div className='product-list' data-aos="fade-down">
        {ans}
      </div>
    </>
  )
};

export default Tablet;
