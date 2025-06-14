import React, { useState } from 'react';
import Iceland from './Iceland';
import SecretLagoon from './SecretLagoon';

const Router = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple router based on hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  switch (currentPage) {
    case 'secret-lagoon':
      return <SecretLagoon />;
    default:
      return <Iceland />;
  }
};

export default Router;