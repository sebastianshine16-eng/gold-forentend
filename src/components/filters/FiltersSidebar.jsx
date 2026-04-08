import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";

export default function FiltersSidebar({ setFilter, selectedCategory, setSelectedCategory, selectedMaterials, setSelectedMaterials, priceRange, setPriceRange, selectedSize, setSelectedSize }) {
  const categories = ["All", "Chains", "Rings", "Bracelets", "Bands", "Accessories", "Pendants"];
  const materials = ["Gold", "Platinum", "Silver", "Diamond", "Onyx"];

  const toggleMaterial = (mat) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  return (
    <div className="space-y-12">
      {/* Search */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-gray-900">Search</h4>
        <div className="relative border-b border-gray-200 py-2">
          <input
            type="text"
            placeholder="Find your piece..."
            className="bg-transparent text-sm w-full outline-none placeholder:text-gray-300"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-900">Collections</h4>
        <ul className="space-y-3">
          {categories.map(cat => (
            <li key={cat}>
              <button 
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm transition-colors flex items-center group ${selectedCategory === cat ? 'text-brandGold' : 'text-gray-500 hover:text-brandGold'}`}
              >
                <span className={`h-[1px] bg-brandGold transition-all duration-300 mr-0 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:mr-2 ${selectedCategory === cat ? 'w-4 mr-2 opacity-100' : 'w-0'}`}></span>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Materials */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-900">Material</h4>
        <ul className="space-y-3">
          {materials.map(mat => (
            <li key={mat} className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                id={mat} 
                checked={selectedMaterials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="w-4 h-4 border-gray-300 rounded text-brandGold focus:ring-brandGold cursor-pointer"
              />
              <label htmlFor={mat} className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">{mat}</label>
            </li>
          ))}
        </ul>
      </div>

      <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
      <SizeFilter selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
    </div>
  );
}