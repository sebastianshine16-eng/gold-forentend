import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x500?text=Premium+Jewelry";
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
      </Link>
      
      {/* Quick Add Button Overlay */}
      <div className="relative">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="absolute bottom-full left-0 right-0 bg-brandGold text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium uppercase text-xs tracking-widest z-10"
        >
          Add to Bag
        </button>
      </div>

      <div className="p-4 text-center">
        <Link to={`/product/${product._id}`}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">{product.material || "Premium Jewelry"}</p>
          <h2 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-brandGold transition-colors line-clamp-1">
            {product.name}
          </h2>
          <p className="text-brandGold font-semibold text-lg">
            {formatPrice(product.price)}
          </p>
        </Link>
      </div>
    </div>
  );
}