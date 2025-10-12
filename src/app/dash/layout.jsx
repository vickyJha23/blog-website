import React from 'react'
import Navigation from '@/components/Navigation';
import "../globals.css";


const DashLayout = ({children}) => {
  return (
      <html>
           <body>
                 <Navigation />
                <main>
                    {children}
                </main>
           </body>
      </html>  
  )
}

export default DashLayout;