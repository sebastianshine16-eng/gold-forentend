export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false 
}) {
  const baseStyles = 'px-8 py-3 font-medium uppercase text-xs tracking-widest transition-all duration-300';
  const variants = {
    primary: 'bg-brandGold text-white hover:bg-yellow-600 disabled:bg-gray-300',
    secondary: 'bg-brandRed text-white hover:bg-red-900 disabled:bg-gray-300',
    outline: 'border border-brandGold text-brandGold hover:bg-brandGold hover:text-white disabled:border-gray-300 disabled:text-gray-300',
    ghost: 'text-gray-600 hover:text-brandGold'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
