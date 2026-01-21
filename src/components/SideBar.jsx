import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Toggle button (Mobile) */}
      <button
        className="btn btn-dark d-md-none m-2"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div
        className="offcanvas-md offcanvas-start sidebar bg-white border-end"
        tabIndex="-1"
        id="sidebar"
      >
        <div className="offcanvas-header d-md-none">
          <h5 className="fw-bold">GymFlow</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-3">
          
          {/* Logo */}
          <Link
            to="/dashboard"
            className="d-flex align-items-center mb-4 text-decoration-none border-bottom pb-3"
          >
            <i className="fa-solid fa-dumbbell fs-4 text-dark me-2"></i>
            <div>
              <h5 className="fw-bold mb-0 text-dark">GymFlow</h5>
              <small className="text-muted">Admin Portal</small>
            </div>
          </Link>

          {/* Links */}
          <ul className="nav nav-pills flex-column gap-2">
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                <i className="fa-solid fa-house me-3"></i> Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/members" className="nav-link">
                <i className="fa-solid fa-people-group me-3"></i> Members
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/trainers" className="nav-link">
                <i className="fa-solid fa-person-running me-3"></i> Trainers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/plans" className="nav-link">
                <i className="fa-solid fa-credit-card me-3"></i> Plans
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/sessions" className="nav-link">
                <i className="fa-solid fa-calendar-check me-3"></i> Sessions
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                <i className="fa-solid fa-layer-group me-3"></i> Categories
              </NavLink>
            </li>
          </ul>

          {/* Logout */}
          <div className="mt-auto pt-3 border-top">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


