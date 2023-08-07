import React, { useState, useEffect } from 'react';
import Navbar from '../components/Board/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Board/Sidebar';
import SidebarProject from '../components/project/SidebarProject';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Loading from '../components/homeTrello/Loading';

export default function Main_layout() {
  const location = useLocation();
  const isHome =
    location.pathname === '/home' || location.pathname === '/home/contentBoard';
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="home">
      <Navbar />
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className={`${isHome ? 'container' : ''} d-flex `}>
          {isHome ? <Sidebar /> : <SidebarProject />}
          <Outlet />
        </div>
      )}
    </div>
  );
}
