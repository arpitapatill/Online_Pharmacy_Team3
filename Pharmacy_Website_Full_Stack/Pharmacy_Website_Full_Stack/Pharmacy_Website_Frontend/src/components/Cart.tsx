
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {X, Plus, Minus, ShoppingBag, Trash2} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Cart = () => {
  const { 
    cart, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useStore()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id)
    toast.success(`${name} removed from cart`, {
      style: {
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }
    })
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }
      })
      return
    }
    
    toast.success('Proceeding to checkout...', {
      style: {
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        border: '1px solid rgba(34, 197, 94, 0.3)'
      }
    })
    setCartOpen(false)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass-dark border-l border-purple-500/30 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold gradient-text">
                  Shopping Cart ({cart.length})
                </h2>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(false)}
                className="p-2 glass rounded-full hover-glow"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-12 h-12 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Add some products to get started</p>
                  </motion.div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="glass rounded-2xl p-4 hover-glow"
                    >
                      <div className="flex items-center space-x-4">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold gradient-text">
                              ${item.price}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              
                              <span className="w-8 text-center font-semibold text-white">
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-700/50 space-y-4">
                {/* Clear Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="w-full py-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  Clear Cart
                </motion.button>
                
                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-white">Total:</span>
                  <span className="gradient-text">${total.toFixed(2)}</span>
                </div>
                
                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 neon-glow"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart
