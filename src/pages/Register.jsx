import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import authService from "../services/authService";
import { loginStart, loginFailure, clearError } from "../redux/authSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      await authService.register(formData);
      // Registration successful - navigate to login
      navigate("/login", { state: { message: "Account created successfully. Please sign in." } });
    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      const errorMessage = Array.isArray(errorDetail) 
        ? errorDetail[0]?.msg 
        : errorDetail || "Registration failed";
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="bg-white w-full max-w-md p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-gray-900 mb-2 tracking-widest uppercase">Join GOLD</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Create your premium account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                placeholder="••••••••"
              />
            </div>

            <div className="text-[10px] text-gray-400 leading-relaxed">
              By creating an account, you agree to our <Link to="/" className="underline text-gray-600">Privacy Policy</Link> and <Link to="/" className="underline text-gray-600">Terms of Service</Link>.
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 mt-4"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Already have an account?{" "}
              <Link to="/login" className="text-brandGold font-bold hover:text-yellow-600 transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
