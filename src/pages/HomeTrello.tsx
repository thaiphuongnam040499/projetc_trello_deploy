import React, { useState, useEffect, CSSProperties } from 'react';
import NavbarTrello from '../components/homeTrello/NavbarTrello';
import ContentTrello from '../components/homeTrello/ContentTrello';
import Footer from '../components/homeTrello/Footer';
import { ClipLoader } from 'react-spinners';

export default function HomeTrello() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <ClipLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <NavbarTrello />
          <ContentTrello />
          <Footer />
        </div>
      )}
    </div>
  );
}
