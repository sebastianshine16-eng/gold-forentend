import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import productService from "../services/productService";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Chains",
    material: "18k Yellow Gold",
    description: "",
    details: ""
  });

  const categories = ["Chains", "Rings", "Bracelets", "Bands", "Accessories", "Pendants"];
  const materials = ["Gold", "Platinum", "Silver", "Diamond", "Onyx"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Format details as an array if it's a string
      const productData = {
        ...formData,
        price: Number(formData.price),
        details: formData.details.split("\n").filter(d => d.trim() !== "")
      };

      await productService.createProduct(productData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product. Make sure backend is running.");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white p-8 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center uppercase tracking-widest">Add New Masterpiece</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Product Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Solid 18k Gold Curb Chain"
                  className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-brandGold transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Price (₹)</label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 84500"
                  className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-brandGold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Image URL</label>
              <input
                required
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-brandGold transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Collection</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-brandGold transition-colors bg-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Primary Material</label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-brandGold transition-colors bg-transparent"
                >
                  {materials.map(mat => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Description</label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="A timeless masterpiece..."
                className="w-full border border-gray-200 p-3 text-sm outline-none focus:border-brandGold transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-2">Product Details (One per line)</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="4"
                placeholder="Weight: 45g&#10;Length: 22 inches&#10;Clasp: Lobster Lock"
                className="w-full border border-gray-200 p-3 text-sm outline-none focus:border-brandGold transition-colors"
              />
            </div>

            <div className="pt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-brandGold hover:bg-yellow-600 text-white py-4 font-bold uppercase tracking-[0.2em] text-sm transition-colors disabled:bg-gray-300"
              >
                {loading ? "Adding to Collection..." : "Add to Collection"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
