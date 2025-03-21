import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
//
const TopMenu = () => {
  const ProductData = useSelector(state => state.mycart.cart);
  const proLength = ProductData.length;

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false); 
  const [isLogedIn, setIsLogedIn] = useState(!!localStorage.getItem("username")); 
  const [isLoggedOut, setIsLoggedOut] = useState(true); 

 
  useEffect(() => {
    setIsLogedIn(!!localStorage.getItem("username")); 
  }, [isLoggedOut]);

  const logout = () => {
    localStorage.clear("username");
    setIsLoggedOut(false); 
    setShowDropdown(false); 
    toast.success("logout!", { position: "bottom-right", autoClose: 3000 });

    navigate("/home"); 
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top" 
        className="navcolor shadow-sm"
        style={{
          backgroundColor: "#2C3E50",
          padding: "12px 0",
          zIndex: 9999 
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: "0.5px"
            }}
          >
            OPPO<span style={{color:"green"}}>Store</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="home" style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} className="nav-link-hover">Home</Nav.Link>
              <Nav.Link as={Link} to="mobile" style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} className="nav-link-hover">Mobile</Nav.Link>
              <Nav.Link as={Link} to="tablet" style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} className="nav-link-hover">Tablet</Nav.Link>
              <Nav.Link as={Link} to="audio" style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} className="nav-link-hover">Audio</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link as={Link} to="search" style={{color: "#ffffff", marginLeft: "10px"}}>
                <FaSearch/>
              </Nav.Link>
              <Nav.Link as={Link} to="cart" style={{color: "#ffffff", marginLeft: "10px"}}>
                <FaShoppingCart size={20} />
                <sup className="myitem">{proLength}</sup>
              </Nav.Link>
              <Nav className="d-flex gap-3">
                {/* DROPDOWN */}
                <Dropdown
                  show={showDropdown}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Nav.Link className="d-flex align-items-center" onClick={() => setShowDropdown(!showDropdown)} style={{ marginRight: "30px" }}>
                    <FaUser size={20} className="cursor-pointer mt-1" style={{color: "#ffffff",}} />
                  </Nav.Link>
                  <Dropdown.Menu align="end" className="user-dropdown-menu">
                    {isLogedIn ? (
                      <>
                        <Dropdown.Item as={Link} to="/profile" className="welcome-text">
                          Welcome,<br /> {localStorage.getItem("username")}!
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Dropdown.Item as={Link} to="/userlogin">Login</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/usersignup">Signup</Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add some CSS for hover effects */}
      <style jsx>{`
        .nav-link-hover:hover {
          color: #3498DB !important;
        }

        .user-dropdown-menu {
          padding: 0;
          min-width: 180px;
        }

        .welcome-text {
          font-weight: bold;
          color: #2C3E50;
        }
      `}</style>
    </>
  );
};

export default TopMenu;
