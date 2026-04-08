import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-brandRed text-white text-[10px] uppercase tracking-[0.2em] py-2.5 text-center font-medium">
        Complimentary insured shipping on all orders
      </div>

      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
        {/* Left: Navigation Links */}
        <div className="hidden lg:flex flex-1 space-x-10 text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-500">
          <Link to="/" className="hover:text-brandGold transition-colors duration-300">Collection</Link>
          <Link to="/" className="hover:text-brandGold transition-colors duration-300">Bespoke</Link>
          <Link to="/" className="hover:text-brandGold transition-colors duration-300">Our Story</Link>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="flex flex-col items-center">
          <h1 className="text-4xl font-serif tracking-[0.3em] text-gray-900 uppercase">GOLD</h1>
          <span className="text-[8px] tracking-[0.5em] text-gray-400 uppercase mt-1 font-bold">Jewelry & Co.</span>
        </Link>

        {/* Right: Auth and Cart */}
        <div className="flex-1 flex items-center justify-end space-x-8">
          <div className="hidden md:flex items-center space-x-6 border-r border-gray-100 pr-8">
            {isAuthenticated ? (
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold leading-tight">Welcome</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-900">
                      {user?.email?.split('@')[0] || "Member"}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-brandGold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Account</p>
                      <p className="text-[11px] font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <Link to="/" className="block px-4 py-2 text-[11px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-brandGold transition-colors">Profile</Link>
                    <Link to="/" className="block px-4 py-2 text-[11px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-brandGold transition-colors">Orders</Link>
                    <Link to="/add-product" className="block px-4 py-2 text-[11px] uppercase tracking-widest text-brandRed font-bold hover:bg-gray-50 transition-colors">Add Product</Link>
                    <div className="border-t border-gray-50 mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-widest text-gray-400 hover:text-brandRed hover:bg-red-50 transition-all flex items-center space-x-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link 
                  to="/login" 
                  className="text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-600 hover:text-brandGold transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gray-900 text-white px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brandGold transition-colors duration-300"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/cart" className="relative group flex items-center space-x-2">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 group-hover:text-brandGold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div className="absolute -top-2 -right-2 bg-brandGold text-white text-[9px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-sm">
                {itemCount}
              </div>
            </div>
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-600 group-hover:text-brandGold transition-colors duration-300 hidden lg:block">Bag</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}