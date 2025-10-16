import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreateAccount) {
        const response = await axios.post(
          `${backendURL}/register`,
          { name, email, password },
          { withCredentials: true } // important for cookies
        );

        if (response.status === 201) {
          // ✅ Fetch full user data from backend
          await getUserData();
          setIsLoggedIn(true);
          toast.success("Account created successfully.");
          navigate("/");
        }
      } else {
        const response = await axios.post(
          `${backendURL}/login`,
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          await getUserData();
          toast.success("Login successful");
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(90deg,#6a5af9,#8268f9)" }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-light fw-bold fs-4 text-decoration-none"
        >
          <img src={assets.authifyLogo} alt="logo" height={32} width={32} />
          Authify
        </Link>
      </div>

      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">
          {isCreateAccount ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="***************"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <Link to="/reset-password" className="text-decoration-none">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          {isCreateAccount ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsCreateAccount(false)}
                className="text-decoration-underline"
                style={{ cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setIsCreateAccount(true)}
                className="text-decoration-underline"
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
