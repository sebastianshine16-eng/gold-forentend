import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user = useSelector((state) => state.auth?.user || null);
  const isAuthenticated = useSelector((state) => !!state.auth?.user);

  return {
    user,
    isAuthenticated,
  };
};
