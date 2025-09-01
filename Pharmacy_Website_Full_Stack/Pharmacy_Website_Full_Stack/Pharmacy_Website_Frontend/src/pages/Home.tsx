
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {ArrowRight, Shield, Clock, Heart, Star, Truck, Award, Users, TrendingUp} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import ProductSlider from '../components/ProductSlider'
import TestimonialSlider from '../components/TestimonialSlider'
import Footer from '../components/Footer'
import HeroSlider from '../components/HeroSlider'
import CategoryShowcase from '../components/CategoryShowcase'

// Safe CountUp component
const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])
  
  return <span>{count}{suffix}</span>
}

const Home = () => {
  // Safe store access with fallbacks
  const store = useStore()
  const { fetchProducts, products } = useStore()
  
  // Fetch products when component mounts
  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  
  const featuredProducts = React.useMemo(() => {
    try {
      if (!store || !store.featuredProducts) return []
      return Array.isArray(store.featuredProducts) ? store.featuredProducts : []
    } catch (error) {
      console.error('Featured products error:', error)
      return []
    }
  }, [store])
  
  // Fallback: if no featured products, show the latest products
  const displayProducts = React.useMemo(() => {
    if (featuredProducts.length > 0) return featuredProducts
    return Array.isArray(products) ? products.slice(0, 8) : []
  }, [featuredProducts, products])
  

  const features = [
    {
      icon: Shield,
      title: 'FDA Certified',
      description: 'All medications are FDA approved and quality tested',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock support and emergency consultations',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day delivery available in your area',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Sourced from certified pharmaceutical manufacturers',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { number: 50000, label: 'Happy Customers', icon: Users },
    { number: 1000, label: 'Products Available', icon: Heart },
    { number: 99, label: 'Customer Satisfaction', suffix: '%', icon: TrendingUp },
    { number: 24, label: 'Hour Support', suffix: '/7', icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    <CountUp
                      end={stat.number}
                      duration={2}
                      suffix={stat.suffix || ''}
                    />
                  </div>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose PharmaCare?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience premium healthcare with our cutting-edge technology and unmatched service quality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -15, scale: 1.02 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 h-full relative overflow-hidden">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-all duration-300 relative z-10">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Featured Products Slider */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSlider 
            products={displayProducts} 
            title="Featured Products" 
          />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 hover:border-purple-500/50 transition-all duration-500"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Experience Premium Healthcare?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers who trust PharmaCare for their health needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Start Shopping
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-purple-500/50 text-white rounded-full font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
