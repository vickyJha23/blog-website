"use client"


import React from 'react'
import Navigation from '@/components/Navigation';
import "../globals.css";
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const clientQuery = new QueryClient();

const DashLayout = ({ children }) => {
 

  return (
    <html>
      <body>
        <Provider store={store}>
          <QueryClientProvider client={clientQuery}>
           <ProtectedRoute>
              <Sidebar />
              <Navigation />
              {children}
              <ToastContainer />
           </ProtectedRoute>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>

  )
}

export default DashLayout;