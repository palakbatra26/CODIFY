import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiHome, FiUsers, FiUserCheck, FiClipboard } from "react-icons/fi";
import "./sidebar.css";
import { getToalNoUserQuizCreators } from "../../utils/API";

const Sidebar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getToalNoUserQuizCreators()
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  
}, []);



console.log(data+"this data from sidebar")
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">CoDiFy</h2>
        <p className="sidebar-tagline">Admin Panel</p>
      </div>

      <div className="sidebar-stats">
        <div className="sidebar-stat">
          <span>Users</span>
          <strong>{data.totalUsers}</strong>
        </div>
        <div className="sidebar-stat">
          <span>Creators</span>
          <strong>{data.totalCreators}</strong>
        </div>
        <div className="sidebar-stat">
          <span>Quizzes</span>
          <strong>{data.totalQuizzes}</strong>
        </div>
      </div>

      <p className="sidebar-section">Main Menu</p>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiHome className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiUsers className="sidebar-icon" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/creators"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiUserCheck className="sidebar-icon" />
          <span>Creators</span>
        </NavLink>

        <NavLink
          to="/quizzes"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiClipboard className="sidebar-icon" />
          <span>Quizzes</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>Role: Admin</p>
        <span>v1.0.0</span>
      </div>
    </aside>
  );
};

export default Sidebar;




