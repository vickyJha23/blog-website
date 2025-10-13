import React from 'react'
import Navigation from '@/components/Navigation';
import "../globals.css";
import Sidebar from '@/components/Sidebar';

const DashLayout = ({children}) => {
  return (
      <html>
           <body>
                 <Navigation />
                  <Sidebar />   
                <main>
                    {children}
                </main>
           </body>
      </html>  
  )
}

export default DashLayout;