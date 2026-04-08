import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { formatPrice } from "../utils/formatPrice";
import Button from "../components/common/Button";
import { useCart } from "../hooks/useCart";

// Static data for demo
const PRODUCTS = [
  {
    _id: "1",
    name: "Solid 18k Gold Curb Chain",
    price: 84500,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    category: "Chains",
    material: "18k Yellow Gold",
    description: "A timeless masterpiece. This solid 18k gold curb chain is handcrafted to perfection, offering a substantial weight and a brilliant finish that commands attention. Perfect for the modern man who values tradition and quality.",
    details: ["Weight: 45g", "Length: 22 inches", "Clasp: Lobster Lock", "Purity: 18k (750)"]
  },
  {
    _id: "2",
    name: "Classic Gold Signet Ring",
    price: 32000,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
    category: "Rings",
    material: "22k Yellow Gold",
    description: "Exude authority and heritage with our Classic Gold Signet Ring. Polished to a mirror finish, this piece can be custom engraved with your initials for a truly personal touch.",
    details: ["Weight: 12g", "Band Width: 4mm", "Face Diameter: 14mm", "Purity: 22k (916)"]
  },
  {
    _id: "3",
    name: "Royal Gold Cufflinks",
    price: 18500,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=2070&auto=format&fit=crop",
    category: "Accessories",
    material: "14k White Gold",
    description: "The perfect finishing touch for your formal attire. These 14k white gold cufflinks feature a subtle textured finish that catches the light beautifully.",
    details: ["Weight: 8g per pair", "Finish: Hammered", "Backing: Whale Flip", "Purity: 14k (585)"]
  },
  {
    _id: "4",
    name: "Diamond Studded Cuban Link",
    price: 155000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop",
    category: "Bracelets",
    material: "14k Gold & VVS Diamonds",
    description: "The ultimate statement of luxury. This Cuban link bracelet is meticulously hand-set with over 5 carats of VVS clarity diamonds in a 14k solid gold setting.",
    details: ["Total Carat Weight: 5.2ct", "Diamond Clarity: VVS1", "Width: 12mm", "Gold Weight: 38g"]
  },
  {
    _id: "5",
    name: "Black Diamond Onyx Ring",
    price: 42000,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070&auto=format&fit=crop",
    category: "Rings",
    material: "18k Rose Gold",
    description: "A sophisticated blend of classic and contemporary. This ring features a central black onyx stone flanked by micro-pave black diamonds in a warm 18k rose gold band.",
    details: ["Stone: Natural Black Onyx", "Diamonds: 0.45ct Black Diamonds", "Setting: Pave", "Band: 6mm"]
  },
  {
    _id: "6",
    name: "Golden Eagle Pendant",
    price: 28000,
    image: "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?q=80&w=2070&auto=format&fit=crop",
    category: "Pendants",
    material: "24k Pure Gold Leaf",
    description: "Symbolizing power and freedom, this intricate eagle pendant is crafted with high-relief detail and finished in a combination of polished and brushed 24k gold leaf.",
    details: ["Symbolism: Strength & Freedom", "Finish: Multi-textured", "Dimensions: 30mm x 25mm", "Weight: 15g"]
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  
  // Find product or use first one for demo
  const product = PRODUCTS.find(p => p._id === id) || PRODUCTS[0];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          {/* Image Gallery */}
          <div className="flex-1 space-y-4">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                   <img src={product.image} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 py-4">
            <nav className="text-[10px] uppercase tracking-widest text-gray-400 mb-8">
              <Link to="/" className="hover:text-gray-900">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.category}</span>
            </nav>

            <h1 className="text-4xl font-serif text-gray-900 mb-4 tracking-wide uppercase">{product.name}</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brandGold font-bold mb-8">{product.material}</p>
            
            <p className="text-2xl font-light text-gray-900 mb-10">{formatPrice(product.price)}</p>

            <div className="space-y-8 mb-12">
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {product.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Specifications</h4>
                <ul className="grid grid-cols-2 gap-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-brandGold rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => addItem(product)}
                className="flex-1 py-5 text-sm"
              >
                Add to Bag
              </Button>
              <Button variant="outline" className="flex-1 py-5 text-sm">
                Wishlist
              </Button>
            </div>

            {/* Shipping Info Accordion-style */}
            <div className="border-t border-gray-100 pt-8 space-y-6">
              <div className="flex items-start space-x-4">
                <svg className="w-5 h-5 text-brandGold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Authenticity Guaranteed</h5>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Every piece comes with a certificate of authenticity.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg className="w-5 h-5 text-brandGold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Insured Shipping</h5>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Complimentary insured delivery within 5-7 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
