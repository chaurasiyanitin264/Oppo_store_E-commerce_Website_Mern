import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from '../config';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const OrderDetails = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
    const api = `${BASE_URL}/admin/customerorder`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h4 className="mt-4 mb-3">Customer Order Details</h4>

      <Table striped bordered hover responsive style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>Order No.</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Shipping Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {mydata && mydata.length > 0 ? (
            mydata.map((order, index) => (
              <tr key={order._id || index}>
                <td>Cust_order_00{index + 1}</td>
                <td>{order.customername}</td>
                <td>{order.product}</td>
                <td>{order.amount}</td>
                <td>{order.address}</td>
                <td>{order.city}</td>
                <td>{order.email}</td>
                <td>{order.contact}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No order data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default OrderDetails;
