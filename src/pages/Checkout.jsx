import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import Button from "../components/common/Button";

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Form */}
          <div className="flex-1 space-y-12">
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-900">1. Contact Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <input 
                  type="email" 
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="Email Address"
                />
              </div>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-900">2. Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="First Name"
                />
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="Last Name"
                />
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300 md:col-span-2" 
                  placeholder="Street Address"
                />
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="City"
                />
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                  placeholder="Postal Code"
                />
              </div>
            </section>

            <section>
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-900">3. Payment</h2>
              <div className="bg-white p-8 border border-gray-100 space-y-6">
                <div className="flex items-center space-x-4 p-4 border border-brandGold bg-gray-50">
                  <div className="w-4 h-4 rounded-full border-4 border-brandGold"></div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Credit / Debit Card</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <input 
                    type="text" 
                    className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300 md:col-span-2" 
                    placeholder="Card Number"
                  />
                  <input 
                    type="text" 
                    className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                    placeholder="Expiry (MM/YY)"
                  />
                  <input 
                    type="text" 
                    className="w-full border-b border-gray-200 py-3 text-sm outline-none focus:border-brandGold transition-colors placeholder:text-gray-300" 
                    placeholder="CVV"
                  />
                </div>
              </div>
            </section>
            
            <Button className="w-full py-5 text-sm">Complete Purchase</Button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-10 border border-gray-100 sticky top-32">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-gray-900">Your Order</h2>
              
              <div className="space-y-6 mb-8 pb-8 border-b border-gray-100 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-16 bg-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-900">{formatPrice(item.price * (item.quantity || 1))}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Shipping</span>
                  <span className="text-brandGold font-bold">Free</span>
                </div>
                <div className="flex justify-between text-sm pt-4 border-t border-gray-100">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Total</span>
                  <span className="text-lg font-serif text-brandGold font-bold">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed text-center">
                All prices include taxes and insured shipping.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
