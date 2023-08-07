import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  return (
    <div>
      <Outlet />
    </div>
  );
}
