
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {Plus, Edit, Trash2, Users, Package, DollarSign, TrendingUp, Eye, BarChart3, ShoppingCart, Star, Save, X} from 'lucide-react'
import { useStore } from '../store/useStore'
import CountUp from 'react-countup'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, cart, fetchProducts } = useStore()
  
  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    prescription: false,
    stock: '',
    featured: false
  })

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      prescription: false,
      stock: '',
      featured: false
    })
  }

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }
      })
      return
    }

    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      })

      // Fetch products from the backend after adding a new product
      await fetchProducts()

      toast.success('Product added successfully!', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }
      })

      setShowAddModal(false)
      resetForm()
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Failed to add product. Please try again.', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }
      })
    }
  }

  const handleEditProduct = async () => {
    if (!selectedProduct) return

    try {
      await updateProduct(selectedProduct.id, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      })

      // Fetch products from the backend after updating a product
      await fetchProducts()

      toast.success('Product updated successfully!', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }
      })

      setShowEditModal(false)
      setSelectedProduct(null)
      resetForm()
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Failed to update product. Please try again.', {
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }
      })
    }
  }

  const handleDeleteProduct = async (id: string | number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id)
        
        // Fetch products from the backend after deleting a product
        await fetchProducts()
        
        toast.success('Product deleted successfully!', {
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }
        })
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product. Please try again.', {
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }
        })
      }
    }
  }

  const openEditModal = (product: any) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      prescription: product.prescription,
      stock: product.stock.toString(),
      featured: product.featured || false
    })
    setShowEditModal(true)
  }

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: 'Total Revenue',
      value: 125690,
      prefix: '$',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+8.2%'
    },
    {
      title: 'Active Orders',
      value: cart.length,
      icon: ShoppingCart,
      color: 'from-purple-500 to-pink-500',
      change: '+15%'
    },
    {
      title: 'Customer Rating',
      value: 4.8,
      suffix: '/5',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      change: '+0.3'
    }
  ]

  const categories = ['Pain Relief', 'Vitamins', 'Supplements', 'Prescription', 'Sleep Aid', 'Digestive']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Manage your pharmacy products and monitor performance
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="mt-6 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 neon-glow"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-dark rounded-3xl p-6 hover-glow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              
              <div className="text-3xl font-bold gradient-text">
                {stat.prefix}
                <CountUp end={stat.value} duration={2} />
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="glass-dark rounded-3xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold gradient-text flex items-center">
              <Package className="w-6 h-6 mr-3" />
              Product Management
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            className="h-12 w-12 rounded-xl object-cover mr-4"
                            src={product.image}
                            alt={product.name}
                          />
                          <div>
                            <div className="text-sm font-medium text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-400 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold gradient-text">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          product.stock > 20 
                            ? 'bg-green-500/20 text-green-300' 
                            : product.stock > 0 
                            ? 'bg-yellow-500/20 text-yellow-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {product.prescription && (
                            <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded">
                              Rx
                            </span>
                          )}
                          {product.featured && (
                            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEditModal(product)}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ProductModal
            title="Add New Product"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddProduct}
            onClose={() => {
              setShowAddModal(false)
              resetForm()
            }}
            categories={categories}
          />
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditModal && (
          <ProductModal
            title="Edit Product"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEditProduct}
            onClose={() => {
              setShowEditModal(false)
              setSelectedProduct(null)
              resetForm()
            }}
            categories={categories}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

interface ProductModalProps {
  title: string
  formData: any
  setFormData: (data: any) => void
  onSubmit: () => void
  onClose: () => void
  categories: string[]
}

const ProductModal: React.FC<ProductModalProps> = ({
  title,
  formData,
  setFormData,
  onSubmit,
  onClose,
  categories
}) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="glass-dark rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold gradient-text">{title}</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 glass rounded-full hover-glow"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter product description"
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.prescription}
                  onChange={(e) => setFormData({ ...formData, prescription: e.target.checked })}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-300">Prescription Required</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-300">Featured Product</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSubmit}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <Save className="w-5 h-5" />
              <span>Save Product</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-2xl font-semibold hover:bg-gray-600/20 transition-all duration-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default AdminDashboard
