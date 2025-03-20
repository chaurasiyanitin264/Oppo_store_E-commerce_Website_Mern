import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WEB_URL from "../config";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';

const CheckOut = () => {
  const [mydata, setMydata] = useState({});
  const navigate = useNavigate();
  const proData = useSelector(state => state.mycart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/userlogin");
    }
    loadData();
  }, []);

  const loadData = async () => {
    const api = `${WEB_URL}/user/getuserdetail`;
    const response = await axios.post(api, { id: localStorage.getItem("userid") });
    console.log(response.data);
    setMydata(response.data);
  };

  let totalAmount = 0;
  let myProImg = "";
  let myProList = "";
  const ans = proData.map((key) => {
    totalAmount += key.price * key.qnty;
    myProImg = `${WEB_URL}/${key.defaultImage}`;
    myProList += key.name + ", ";
    return (
      <tr key={key.id}>
        <td>
          <img src={`${WEB_URL}/${key.defaultImage}`} style={{ width: 50, height: 50 }} alt="Product" />
        </td>
        <td>{key.name}</td>
        <td>{key.brand}</td>
        <td>{key.price}</td>
        <td>{key.qnty}</td>
        <td>{key.price * key.qnty}</td>
      </tr>
    );
  });

  const initPay = (data) => {
    const options = {
      key: "rzp_test_kDhR9S2dT4FiqU",
      amount: data.amount,
      currency: data.currency,
      name: myProList,
      description: "Test",
      image: myProImg,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "https://localhost:8000/api/payment/verify";
          const { data } = await axios.post(verifyURL, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8000/api/payment/orders";
      const { data } = await axios.post(orderURL, {
        amount: totalAmount,
        customername: mydata.name,
        product: myProList,
        address: mydata.address,
        city: mydata.city,
        email: mydata.email,
        contact: mydata.contact
      });
      console.log(data);
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{marginTop:"90px"}} align="center">Check out Page</h1>
      <div className="container">
        {/* Form Section */}
        <div className="form-section">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" value={mydata.name} style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Contact no</Form.Label>
              <Form.Control type="text" value={mydata.contact} style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={mydata.email} style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" value={mydata.address} style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={mydata.city} style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
          </Form>
        </div>

        {/* Table Section */}
        <div className="table-section" style={{marginTop:"30px",overflowY: "scroll",}}>
          <Table striped bordered hover style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {ans}
              <tr>
                <th colSpan="5">Net Amount:</th>
                <th>{totalAmount}</th>
              </tr>
              <tr>
                <th colSpan="6">
                  <Button variant="primary" type="submit" onClick={handlePay}>
                    Pay Now!
                  </Button>
                </th>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 0 auto;
        }

        .form-section {
          flex: 1;
          min-width: 300px;
          padding: 10px;
        }

        .table-section {
          flex: 1;
          min-width: 300px;
          padding: 10px;
        }

        /* Media Queries for Responsiveness */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: center;
          }

          .form-section,
          .table-section {
            width: 100%;
          }

          Table {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default CheckOut;
