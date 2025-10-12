import Link from 'next/link'
import React from 'react'

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Help", href: "/help" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
];


const Footer = () => {
  return (
    <footer className='h-16 bg-black lg:bg-white flex items-center lg:justify-center lg:text-black lg:border-t-2 lg:border-t-black px-4'>
          <ul className='flex gap-4 lg:justify-center'>
                {
                     navLinks.map((link, index) => (<li key={index}>
                         <Link href={link.href}>
                               {link.name}
                         </Link>
                     </li>))
                }
          </ul>

    </footer>
  )
}

export default Footer