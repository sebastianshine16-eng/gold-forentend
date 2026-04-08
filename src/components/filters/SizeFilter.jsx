export default function SizeFilter({ selectedSize, setSelectedSize }) {
  const sizes = ["All", "16", "18", "20", "22", "24"];
  
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-900">Length (Inches)</h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button 
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`w-10 h-10 border text-[10px] font-bold transition-all duration-300 flex items-center justify-center uppercase ${
              selectedSize === size 
                ? 'border-brandGold text-brandGold bg-brandGold/5' 
                : 'border-gray-100 text-gray-400 hover:border-brandGold hover:text-brandGold'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
