import { useEffect } from 'react'
import { useStore } from '../store/useStore'

/**
 * This component is responsible for initializing products from the backend
 * when the application loads. It doesn't render anything visible.
 */
const ProductInitializer = () => {
  const { fetchProducts } = useStore()

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts()
      .then(() => console.log('Products loaded successfully'))
      .catch(error => console.error('Error loading products:', error))
  }, [fetchProducts])

  // This component doesn't render anything
  return null
}

export default ProductInitializer