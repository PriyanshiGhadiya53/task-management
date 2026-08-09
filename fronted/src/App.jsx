// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* Dynamic page content child routes se yahan render hoga */}
      <Outlet />

      {/* Global Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;