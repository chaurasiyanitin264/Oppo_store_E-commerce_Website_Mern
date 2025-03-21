import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import WEB_URL from "../config";
import axios from "axios";
import { PiCurrencyInrThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'antd';
import { message } from "antd";
import "../css/productdetails.css"
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice"
import { toast } from "react-toastify";
const ProductDetails = () => {
  const { id } = useParams();
  const [myPro, setMyPro] = useState({});
  const [similarPro, setSimilarPro] = useState([]);
  const [largeImg, setLargeImg] = useState(myPro.defaultImage);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proRating, setProRating] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitRate = async () => {
    const api = `${WEB_URL}/product/productratings`;
    try {
      const response = await axios.post(api, {
        ratings: proRating,
        name: localStorage.getItem("username"),
        userid: localStorage.getItem("userid"),
      });
  
      console.log("Toast should appear now!");
      toast.success("Ratings successfully", { position: "bottom-right", autoClose: 3000 });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Please User Login!", { position: "bottom-right", autoClose: 3000 });
      // navigate("/userlogin");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    const api = `${WEB_URL}/product/showfullproduct/?id=${id}`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMyPro(response.data);
      setLargeImg(response.data.defaultImage);
      loadData1(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const showFullProduct = (id) => {
    navigate(`/showfullproduct/${id}`);
  };

  const loadData1 = async (cate) => {
    const api1 = `${WEB_URL}/product/prolist/?cate=${cate}`;
    try {
      const response1 = await axios.get(api1);
      console.log(response1.data);
      setSimilarPro(response1.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ans = similarPro.map((key1) => {
    return (
      <div key={key1._id} className="similar-product" style={{ margin: "20px" }}>
        <img
          src={`${WEB_URL}/${key1.defaultImage}`}
          onClick={() => {
            showFullProduct(key1._id);
          }}
          alt="Product"
          className="product-image"
        />
        <div className="product-details">
          <p className="product-name">Product : {key1.name}</p>
          <p className="product-price">
            <b>
              Price : <PiCurrencyInrThin /> {key1.price}
            </b>
          </p>
        </div>
      </div>

    );
  });

  return (
    <>
      {/* <h1> Show Product Detail </h1> */}
      <div className="product-container" style={{ backgroundColor: "#E0E8EA", marginTop: "90px" }}>
        <div>
          {myPro.images &&
            myPro.images.map((key) => (
              <p key={key}>
                <img
                  src={`${WEB_URL}/${key}`}
                  onMouseOver={() => {
                    setLargeImg(key);
                  }}
                  style={{ width: "40px", height: "40px", border: "3px solid lightblue", padding: "2px", cursor: "pointer" }}
                  alt="Uploaded File"
                />
              </p>
            ))}
        </div>

        <div>
          <img
            src={`${WEB_URL}/${largeImg}`}
            style={{ width: "200px", height: "200px" }}
            alt="Uploaded File"
          />
        </div>

        <div className="product-info" style={{ backgroundColor: "white", margin: "10px", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "12px", color: "#333" }}>{myPro.name}</h2>

          <h3 style={{ display: "flex", alignItems: "center", fontSize: "22px", color: "#2563eb", marginBottom: "16px" }}>
            <PiCurrencyInrThin style={{ fontSize: "26px", marginRight: "4px" }} /> {myPro.price}
          </h3>

          <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
            <h5 style={{ fontSize: "16px", lineHeight: "1.5", color: "#4b5563", margin: "0" }}>
              <span style={{ fontWeight: "600", color: "#374151" }}>Description: </span>
              {myPro.description}
            </h5>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontStyle: "italic", marginRight: "8px", color: "#4b5563" }}>Ratings: </span>
            <div style={{ display: "flex", alignItems: "center", marginRight: "12px" }}>
              {[...Array(myPro.ratings)].map((_, index) => (
                <FaStar key={index} style={{ color: "#f59e0b", marginRight: "2px" }} />
              ))}
            </div>
            <Button
              onClick={showModal}
              style={{ marginLeft: "8px", fontSize: "14px" }}
            >
              Give your Rate
            </Button>
          </div>

          <hr style={{ border: "none", height: "1px", backgroundColor: "#e5e7eb", margin: "16px 0" }} />

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
                  id: myPro._id,
                  name: myPro.name,
                  brand: myPro.brand,
                  price: myPro.price,
                  description: myPro.description,
                  category: myPro.category,
                  subcategory: myPro.subcategory,
                  images: myPro.images,
                  defaultImage: myPro.defaultImage,
                  ratings: myPro.ratings,
                  status: myPro.status,
                  qnty: 1,
                })
              );
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
          >
            Buy Now
          </button>

        </div>
      </div>

      <hr />
      <center>
        <h2> Similar Products</h2>
      </center>
      <div className="similar-products">{ans}</div>

      <Modal title="Give Product Rating" open={isModalOpen} onOk={handleSubmitRate} onCancel={handleCancel}>
        Select Your Rate:{" "}
        <select value={proRating} onChange={(e) => setProRating(e.target.value)}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </Modal>
    </>
  );
};

export default ProductDetails;