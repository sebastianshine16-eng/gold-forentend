import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addItem = (product) => {
    dispatch(addToCart(product));
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + (item.quantity || 0),
    0
  );

  return {
    cartItems,
    addItem,
    removeItem,
    cartTotal,
    cartCount,
  };
};
