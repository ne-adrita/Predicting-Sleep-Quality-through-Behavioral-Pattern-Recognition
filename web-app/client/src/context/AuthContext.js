import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister, forgotPassword as authForgotPassword } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { token, userId, isNewUser } = await authLogin(email, password);
      setToken(token);
      setUser({ id: userId });
      setIsNewUser(isNewUser);
      
      if (isNewUser) {
        navigate('/initial-health');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { token, userId } = await authRegister(userData);
      setToken(token);
      setUser({ id: userId });
      setIsNewUser(true);
      navigate('/initial-health');
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authForgotPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isNewUser,
        login,
        register,
        forgotPassword,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);