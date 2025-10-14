'use client'
import React from 'react'
import Navigation from '@/components/Navigation';
import "../globals.css";
import Sidebar from '@/components/Sidebar';
import ProtectRoute from '@/components/ProtectRoute';
import { Provider } from 'react-redux';
import { store } from '@/store/store';


const DashLayout = ({children}) => {
  return (
    <html>
       <body>
           <Provider store={store}>
                  <ProtectRoute>
           <div>
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