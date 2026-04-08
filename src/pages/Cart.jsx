import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import Button from "../components/common/Button";

export default function Cart() {
  const { cartItems, removeItem, cartTotal } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16">
        <h1 className="text-4xl font-serif text-gray-900 mb-12 tracking-wide text-center uppercase">Your Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <p className="text-gray-500 font-light text-lg italic">Your bag is currently empty.</p>
            <Link to="/">
              <Button variant="outline">Browse Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Items List */}
            <div className="flex-1 space-y-8">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-6 py-8 border-b border-gray-100 group">
                  <div className="w-32 h-40 bg-gray-100 overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest">{item.name}</h3>
                        <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price * (item.quantity || 1))}</p>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">{item.material || 'Premium Jewelry'}</p>
                      <div className="flex items-center text-[10px] text-gray-500 uppercase tracking-widest">
                        <span>Quantity: {item.quantity || 1}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-brandRed transition-colors w-fit underline decoration-gray-200 underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white p-10 border border-gray-100 sticky top-32">
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-900">Order Summary</h2>
                
                <div className="space-y-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brandGold">Complimentary</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-serif text-brandGold">{formatPrice(cartTotal)}</span>
                </div>

                <Link to="/checkout">
                  <Button className="w-full py-4">Secure Checkout</Button>
                </Link>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 uppercase tracking-widest">
                    <svg className="w-4 h-4 text-brandGold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04kM12 20.944a11.955 11.955 0 01-8.618-3.04M12 20.944a11.955 11.955 0 008.618-3.04" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 uppercase tracking-widest">
                    <svg className="w-4 h-4 text-brandGold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Insured Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
