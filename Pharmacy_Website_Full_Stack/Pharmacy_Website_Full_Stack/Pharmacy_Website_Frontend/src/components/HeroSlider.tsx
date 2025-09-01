
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {ChevronLeft, ChevronRight, Crown, Gem, Zap} from 'lucide-react'

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Static slides data with dark theme only
  const slides = [
    {
      title: "Premium Health Solutions",
      subtitle: "Experience the Future of Pharmacy",
      description: "Discover cutting-edge medications with unparalleled quality and service",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
      icon: Crown
    },
    {
      title: "Advanced Wellness",
      subtitle: "Your Health, Our Priority", 
      description: "Revolutionary healthcare solutions for a better tomorrow",
      image: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg",
      icon: Gem
    },
    {
      title: "Medical Excellence",
      subtitle: "Innovation in Every Dose",
      description: "Transforming lives through premium pharmaceutical care",
      image: "https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg",
      icon: Zap
    }
  ]

  const currentSlide = slides[currentIndex] || slides[0]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!currentSlide) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-gray-300 text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg'
              }}
            />
            {/* Dark overlay - no colorful gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-900/80" />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-600/30">
                  {currentSlide.icon && <currentSlide.icon className="w-6 h-6 text-purple-400" />}
                  <span className="text-gray-200 font-medium">{currentSlide.subtitle}</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold text-gray-100 mb-6 leading-tight"
              >
                {currentSlide.title}
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                {currentSlide.description}
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex justify-center space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-gray-100 rounded-full font-bold text-lg shadow-2xl transition-all duration-300"
                >
                  Explore Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-500 text-gray-200 rounded-full font-bold text-lg hover:bg-gray-800/50 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation - Left Side */}
      <motion.button
        onClick={prevSlide}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-gray-100 hover:bg-gray-700/80 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-8 h-8" />
      </motion.button>

      {/* Manual Navigation - Right Side */}
      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-gray-100 hover:bg-gray-700/80 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="w-8 h-8" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex 
                ? 'bg-purple-500 shadow-lg' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
