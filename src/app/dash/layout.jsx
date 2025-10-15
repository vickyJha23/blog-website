'use client'
import React from 'react'
import Navigation from '@/components/Navigation';
import "../globals.css";
import Sidebar from '@/components/Sidebar';
import ProtectRoute from '@/components/ProtectRoute';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ToastContainer } from 'react-toastify';


const DashLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider store={store}>
          <ProtectRoute>
            <div>
              <ToastContainer autoClose={500} />
              <Navigation />
              <Sidebar />
              <main>
                {children}
              </main>
            </div>
          </ProtectRoute>
        </Provider>
      </body>
    </html>

  )
}

export default DashLayout;