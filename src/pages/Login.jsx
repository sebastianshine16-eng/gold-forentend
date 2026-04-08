import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import authService from "../services/authService";
import { loginStart, loginSuccess, loginFailure, clearError } from "../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);
  const successMessage = location.state?.message;

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const data = await authService.login({ email, password });
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      const errorMessage = Array.isArray(errorDetail) 
        ? errorDetail[0]?.msg 
        : errorDetail || "Login failed";
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="bg-white w-full max-w-md p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-gray-900 mb-2 tracking-widest uppercase">Welcome Back</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Sign in to your GOLD account</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-600 text-[10px] uppercase tracking-widest font-bold text-center">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <Link to="/" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Forgot Password?</Link>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 mt-4"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Don't have an account?{" "}
              <Link to="/register" className="text-brandGold font-bold hover:text-yellow-600 transition-colors">Create One</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}