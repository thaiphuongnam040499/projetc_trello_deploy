import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Auth_layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
