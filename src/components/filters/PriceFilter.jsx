export default function PriceFilter({ priceRange, setPriceRange }) {
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-900">Price Range</h4>
      <div className="space-y-4">
        <input 
          type="range" 
          min="0" 
          max="200000" 
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brandGold h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-medium tracking-widest">
          <span>₹0</span>
          <span>Up to ₹{priceRange.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
