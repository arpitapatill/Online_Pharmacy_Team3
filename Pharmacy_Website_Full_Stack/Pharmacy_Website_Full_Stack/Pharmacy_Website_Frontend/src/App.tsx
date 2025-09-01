
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useStore } from './store/useStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Login from './pages/Login'
import Cart from './pages/Cart'
import AdminDashboard from './pages/AdminDashboard'
import SignUp from './pages/SignUp'
import ProductInitializer from './components/ProductInitializer'

function App() {
  const { isAuthenticated, user } = useStore()

  return (
    <Router>
      <ProductInitializer />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/admin/*"
                    element={
                      isAuthenticated && user?.role === 'admin' ? (
                        <AdminDashboard />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#10B981',
              color: '#fff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App
