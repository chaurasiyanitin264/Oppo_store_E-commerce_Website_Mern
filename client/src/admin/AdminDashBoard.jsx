import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  FaHome, FaPlus, FaList, FaEdit, FaBars, FaTimes, 
  FaUser, FaSignOutAlt, FaChartLine, FaCalendarAlt, 
  FaFileAlt, FaUsers
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './admin.css';

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Correct way to retrieve data from localStorage
  const AdminName = localStorage.getItem("adminname");
  
  const logout = () => {
    // Clear localStorage when the user logs out
    localStorage.clear();
    navigate("/home");
  };
  
  // Check if a link is active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };
  
  // Sample dashboard content to demonstrate the design
  const SampleDashboardContent = () => {
    // This is just placeholder content to show the styling capabilities
    if (!location.pathname.includes('createuser') && 
        !location.pathname.includes('insert') && 
        !location.pathname.includes('usertaskreport') && 
        !location.pathname.includes('update')) {
      return (
        <div>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-primary">
                <h3><FaUsers /> 245</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-success">
                <h3><FaFileAlt /> 132</h3>
                <p>Tasks Completed</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-warning">
                <h3><FaCalendarAlt /> 24</h3>
                <p>Pending Tasks</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-danger">
                <h3><FaChartLine /> 85%</h3>
                <p>Performance</p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h4>Welcome to Admin Dashboard</h4>
            <p>This is a sample dashboard to showcase the styling capabilities.</p>
            <Button className="btn-gradient-primary mt-3">
              Explore Features
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <>
      <div id="admin-dashboard">
        {/* Header */}
        <header>
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <h1 id="admin">Admin Dashboard</h1>
          <div className="header-right">
            <div className="welcome-message">
              <FaUser className="icon" /> {AdminName ? AdminName : "Guest"}
            </div>
            <Button variant="danger" className="logout-btn" onClick={logout}>
              <FaSignOutAlt /> Logout
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <div id="main-content">
          {/* Sidebar */}
          <aside className={`sidebar ${isMenuOpen ? "active" : ""}`}>
            <nav className="navbar">
              <div className="nav-links">
                <Link to="createuser" className={`nav-link ${isActive('createuser') ? 'active' : ''}`}>
                  <FaHome className="icon" /> Home
                </Link>
                <Link to="insert" className={`nav-link ${isActive('insert') ? 'active' : ''}`}>
                  <FaPlus className="icon" /> Insert
                </Link>
                <Link to="usertaskreport" className={`nav-link ${isActive('usertaskreport') ? 'active' : ''}`}>
                  <FaList className="icon" /> Display
                </Link>
                <Link to="update" className={`nav-link ${isActive('update') ? 'active' : ''}`}>
                  <FaEdit className="icon" /> Update
                </Link>
              </div>
            </nav>
          </aside>
          
          {/* Content Area */}
          <div id="content">
            <SampleDashboardContent />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;