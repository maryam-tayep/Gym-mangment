export default function NavBar({ title, text, user = "Admin", email = "admin@gym.com" }) {
  return (
    <nav className="navbar bg-white border-bottom px-3 py-2 d-flex justify-content-between align-items-center">
      
      {/* Left */}
      <div>
        <h5 className="mb-0 fw-bold text-capitalize">{title}</h5>
        <small className="text-muted">{text}</small>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center gap-3">
        <div className="text-end d-none d-md-block">
          <h6 className="mb-0 fw-semibold">{user}</h6>
          <small className="text-muted">{email}</small>
        </div>

        <img
          src="/image/Starter pfp.jpg"
          alt="user"
          className="rounded-circle border"
          style={{ width: 40, height: 40, objectFit: "cover" }}
        />
      </div>
    </nav>
  );
}


