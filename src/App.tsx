import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/auth/SignIn';
import { Route, Routes } from 'react-router-dom';

import Main_layout from './layout/Main_layout';
import Auth_layout from './layout/Auth_layout';
import Content from './components/Board/Content';
import ContentBoard from './components/Board/ContentBoard';
import SignUp from './pages/auth/SignUp';
import HomeTrello from './pages/HomeTrello';
import Home from './pages/app/Home';
import BoardTrello from './components/project/BoardTrello';
import { Chart } from './components/project/Chart';
import Table from './components/project/Table';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Auth_layout />}>
          <Route index element={<HomeTrello />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        <Route element={<Main_layout />}>
          <Route path="/home" element={<Home />}>
            <Route index element={<Content />} />
            <Route path="contentBoard" element={<ContentBoard />} />
          </Route>
          <Route path="/project/:boardId" element={<BoardTrello />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/table" element={<Table />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
