import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <Link to="/" className="flex flex-col leading-tight gap-0.5">
      <div className="flex-items-center gap-2">
      <img src={logo} alt="JobNova" className="w-8 h-8" />
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-indigo-600">
          JobNova
        </span>
        <span className="text-xs text-gray-500">
          Ignite Your Career
        </span>
        </div>
        </div>
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            {user.full_name}{" "}
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full capitalize">
              {user.role}
            </span>
          </span>
          {user.role === "seeker" && (
            <>
              <Link to="/jobs" className="text-sm text-slate-600 hover:text-blue-600">Jobs</Link>
              <Link to="/resume" className="text-sm text-slate-600 hover:text-blue-600">Resume</Link>
              <Link to="/dashboard" className="text-sm text-slate-600 hover:text-blue-600">Dashboard</Link>
            </>
          )}
          {user.role === "recruiter" && (
            <>
              <Link to="/post-job" className="text-sm text-slate-600 hover:text-blue-600">Post Job</Link>
              <Link to="/dashboard" className="text-sm text-slate-600 hover:text-blue-600">Dashboard</Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to="/login" className="text-sm text-slate-600 hover:text-blue-600">Login</Link>
          <Link to="/register" className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">Register</Link>
        </div>
      )}
    </nav>
  );
}