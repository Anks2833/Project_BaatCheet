import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthSuccessRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Store the token in localStorage or your state management solution
      localStorage.setItem('token', token);
      // Redirect to the desired page after successful login
      navigate('/');
    } else {
      // Handle error case
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>Processing login...</div>;
};

export default OAuthSuccessRedirect;