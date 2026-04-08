import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductGrid from "../components/product/ProductGrid";
import FiltersSidebar from "../components/filters/FiltersSidebar";
import productService from "../services/productService";
import heroImage from "../assets/hero.png";

// Authentic men's jewelry collection (Fallback data)
const INITIAL_PRODUCTS = [
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

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState(200000);
  const [selectedSize, setSelectedSize] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.log("Using fallback static data:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.some(m => p.material.toLowerCase().includes(m.toLowerCase()));
    const matchesPrice = p.price <= priceRange;
    const matchesSize = selectedSize === "All" || (p.details && p.details.some(d => d.includes(`Length: ${selectedSize}`)));

    return matchesSearch && matchesCategory && matchesMaterial && matchesPrice && matchesSize;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Premium Men's Jewelry" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <div className="mb-6 w-20 h-20 border border-white/20 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-brandGold opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </div>
          <h2 className="text-5xl font-serif mb-4 tracking-wider">THE ART OF MASCULINITY</h2>
          <p className="text-xl max-w-2xl font-light mb-8">Discover our collection of authentic, handcrafted gold and diamond jewelry designed for the modern man.</p>
          <button className="bg-brandGold hover:bg-yellow-600 text-white px-8 py-3 rounded-none transition duration-300 font-medium tracking-widest uppercase text-sm">
            Explore Collection
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <FiltersSidebar 
              setFilter={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </aside>

          <main className="flex-1">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-serif text-gray-900 mb-1">Authentic Collection</h3>
                <p className="text-gray-500 text-sm">Showing {filtered.length} exclusive pieces</p>
              </div>
              <div className="text-sm text-gray-500">
                Sort by: <span className="text-gray-900 font-medium cursor-pointer">Featured</span>
              </div>
            </div>
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} />
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 italic">No products found matching your filters.</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedMaterials([]);
                    setPriceRange(200000);
                    setSelectedSize("All");
                  }}
                  className="mt-4 text-brandGold underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}