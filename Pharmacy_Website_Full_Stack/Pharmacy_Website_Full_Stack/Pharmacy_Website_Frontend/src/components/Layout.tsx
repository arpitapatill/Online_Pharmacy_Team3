
import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Cart from './Cart'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        {children}
      </motion.main>
      <Cart />
    </div>
  )
}

export default Layout
