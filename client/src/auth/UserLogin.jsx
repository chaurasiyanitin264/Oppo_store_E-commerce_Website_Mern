import { Link } from "react-router-dom";
import WEB_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/home");
    }
  }, [navigate]);

 
  const UserAuth = async (token) => {
    if (token) {
      try {
        let api = `${WEB_URL}/admin/adminauth`;
        const tokenres = await axios.post(api, null, { headers: { "auth-token": token } });
        localStorage.setItem("adminname", tokenres.data.adminname);
        localStorage.setItem("email", tokenres.data.email);
        navigate("/admin"); 
      } catch (error) {
        toast.error("Admin authentication failed", { position: "bottom-right", autoClose: 3000 });
      }
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let api;

    try {
      if (userRole === "user") {
        api = `${WEB_URL}/user/userlogin`; 
      } else if (userRole === "admin") {
        api = `${WEB_URL}/admin/adminlogin`; 
      } else {
        toast.error("Please select a role", { position: "bottom-right", autoClose: 3000 });
        return;
      }

      const response = await axios.post(api, { email, password });
      toast.success("Login Successful!", { position: "bottom-right", autoClose: 3000 });

      
      localStorage.setItem("token", response.data.token);

      if (userRole === "user") {
        navigate("/home");
      } else if (userRole === "admin") {
        UserAuth(response.data.token); 
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.msg : "Login failed", { position: "bottom-right", autoClose: 3000 });
    }
  };

  return (
    <div className="signup-container" style={{ marginTop: "50px" }}>
      <div className="signup-box1">
        <h2 className="signup-title">Log In</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            style={{ width: "100px" }}
            name="userrole"
            className="signup-input"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option>Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/usersignup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
