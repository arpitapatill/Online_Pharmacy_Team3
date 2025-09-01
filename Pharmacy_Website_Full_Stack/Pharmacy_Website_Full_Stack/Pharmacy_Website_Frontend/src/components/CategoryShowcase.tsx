
import React from 'react'
import { motion } from 'framer-motion'
import {Heart, Zap, Shield, Star, Crown, Gem, Brain, Leaf} from 'lucide-react'
import { Link } from 'react-router-dom'

const CategoryShowcase = () => {
  // Static categories data - no external dependencies
  const categories = [
    {
      name: 'Pain Relief',
      icon: Zap,
      count: '15+ Products',
      description: 'Advanced pain management solutions',
      gradient: 'from-red-500 via-pink-500 to-purple-500',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg'
    },
    {
      name: 'Vitamins & Supplements',
      icon: Leaf,
      count: '25+ Products',
      description: 'Premium nutritional supplements',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'
    },
    {
      name: 'Heart Health',
      icon: Heart,
      count: '12+ Products',
      description: 'Cardiovascular wellness solutions',
      gradient: 'from-pink-500 via-red-500 to-orange-500',
      image: 'https://images.pexels.com/photos/3683133/pexels-photo-3683133.jpeg'
    },
    {
      name: 'Brain & Cognitive',
      icon: Brain,
      count: '18+ Products',
      description: 'Mental clarity and focus enhancers',
      gradient: 'from-purple-500 via-indigo-500 to-blue-500',
      image: 'https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg'
    },
    {
      name: 'Prescription Meds',
      icon: Shield,
      count: '50+ Products',
      description: 'Licensed prescription medications',
      gradient: 'from-blue-500 via-cyan-500 to-indigo-500',
      image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg'
    },
    {
      name: 'Beauty & Skincare',
      icon: Gem,
      count: '20+ Products',
      description: 'Premium beauty and skincare',
      gradient: 'from-yellow-500 via-orange-500 to-pink-500',
      image: 'https://images.pexels.com/photos/3683160/pexels-photo-3683160.jpeg'
    }
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-8"
          >
            <Crown className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-semibold">Premium Categories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Explore Our Categories
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover premium healthcare solutions across all categories
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8,
                type: "spring"
              }}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link to="/products">
                <div className="relative overflow-hidden rounded-3xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 h-80 hover:border-purple-500/50 transition-all duration-500">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <motion.img
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg'
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30"
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-white/80 mb-4">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        {category.count}
                      </span>
                      
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors duration-300">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-2xl"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryShowcase
