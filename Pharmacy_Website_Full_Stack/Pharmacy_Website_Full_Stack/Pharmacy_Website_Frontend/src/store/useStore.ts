
import { create } from 'zustand'

interface Product {
  id: number | string
  name: string
  price: number
  image: string
  category: string
  description: string
  prescription: boolean
  stock: number
  rating: number
  reviews: number
  featured: boolean
}

interface CartItem extends Product {
  quantity: number
}

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
}

interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  comment: string
  location: string
}

interface Store {
  // Theme
  isDarkMode: boolean
  toggleDarkMode: () => void
  
  // Auth
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
  
  // Products
  products: Product[]
  featuredProducts: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  fetchProducts: () => Promise<void>
  
  // Cart
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // UI
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
  
  // Testimonials
  testimonials: Testimonial[]
  
  // Animation
  animationEnabled: boolean
  toggleAnimation: () => void
}

// Empty default products array - products will be fetched from backend
const defaultProducts: Product[] = []

// Default testimonials - safe initialization
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    comment: 'Absolutely amazing service! Fast delivery and genuine products.',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg',
    rating: 5,
    comment: 'As a healthcare professional, I trust PharmaCare for quality medications.',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 5,
    comment: 'The online consultation feature is fantastic! Quick responses.',
    location: 'Miami, FL'
  }
]

export const useStore = create<Store>((set, get) => ({
  // Theme
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Auth
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      // Call backend auth API
      const { postJson } = await import('../lib/api')
      const res = await postJson<{ email: string; password: string }, { success: boolean; role?: 'admin' | 'user'; message?: string }>(
        '/api/auth/login',
        { email, password }
      )
      if (!res.success || !res.role) throw new Error(res.message || 'Invalid credentials')

      const isAdmin = res.role === 'admin'
      const user: User = {
        id: Date.now().toString(),
        name: isAdmin ? 'Admin' : 'User',
        email,
        role: isAdmin ? 'admin' : 'user',
        avatar: isAdmin
          ? 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg'
          : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      }
      set({ user, isAuthenticated: true })
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Products - safe initialization
  products: [...defaultProducts],
  fetchProducts: async () => {
    try {
      const { getJson } = await import('../lib/api')
      const products = await getJson<Product[]>('/api/products')
      set({ products })
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },
  
  // Featured products getter - defensive approach
  get featuredProducts() {
    try {
      const products = get().products
      if (!Array.isArray(products)) return []
      return products.filter(product => product && product.featured === true) || []
    } catch (error) {
      console.error('Featured products error:', error)
      return []
    }
  },
  
  setProducts: (products) => {
    try {
      if (Array.isArray(products)) {
        set({ products: [...products] })
      }
    } catch (error) {
      console.error('Set products error:', error)
    }
  },
  
  addProduct: async (product: Omit<Product, 'id'>) => {
    try {
      const { postJson } = await import('../lib/api')
      
      // Create a product object to send to the backend
      const productToAdd = { 
        ...product,
        rating: 4.5,
        reviews: 0,
        featured: product.featured || false
      }
      
      // Send the product to the backend API and return the created product
      const createdProduct = await postJson<Product>('/api/products', productToAdd)
      
      // Update local state immediately for better UX
      set(state => ({
        products: [...state.products, createdProduct]
      }))
      
      return createdProduct
    } catch (error) {
      console.error('Add product error:', error)
      throw error
    }
  },
  
  updateProduct: async (id: string | number, updatedProduct: Partial<Product>) => {
    try {
      const { putJson } = await import('../lib/api')
      
      // Send the updated product to the backend API
      const updated = await putJson<Product>(`/api/products/${id}`, updatedProduct)
      
      // Update local state immediately for better UX
      set(state => ({
        products: state.products.map(p => p.id === id ? updated : p)
      }))
      
      return updated
    } catch (error) {
      console.error('Update product error:', error)
      throw error
    }
  },
  
  deleteProduct: async (id: string | number) => {
    try {
      const { deleteJson } = await import('../lib/api')
      
      // Delete the product from the backend API
      await deleteJson(`/api/products/${id}`)
      
      // Update local state immediately for better UX
      set(state => ({
        products: state.products.filter(p => p.id !== id)
      }))
    } catch (error) {
      console.error('Delete product error:', error)
      throw error
    }
  },
  
  // Cart - safe initialization
  cart: [],
  
  addToCart: (product) => {
    try {
      if (!product || !product.id) return
      
      const { cart } = get()
      const safeCart = Array.isArray(cart) ? cart : []
      const existingItem = safeCart.find((item) => item && item.id === product.id)
      
      if (existingItem) {
        set({
          cart: safeCart.map((item) =>
            item && item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          )
        })
      } else {
        set({ cart: [...safeCart, { ...product, quantity: 1 }] })
      }
    } catch (error) {
      console.error('Add to cart error:', error)
    }
  },
  
  removeFromCart: (id) => {
    try {
      set((state) => ({
        cart: Array.isArray(state.cart) 
          ? state.cart.filter((item) => item && item.id !== id)
          : []
      }))
    } catch (error) {
      console.error('Remove from cart error:', error)
    }
  },
  
  updateQuantity: (id, quantity) => {
    try {
      if (quantity <= 0) {
        get().removeFromCart(id)
        return
      }
      set((state) => ({
        cart: Array.isArray(state.cart)
          ? state.cart.map((item) =>
              item && item.id === id ? { ...item, quantity } : item
            )
          : []
      }))
    } catch (error) {
      console.error('Update quantity error:', error)
    }
  },
  
  clearCart: () => set({ cart: [] }),
  
  // UI
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: Boolean(open) }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: Boolean(loading) }),
  
  // Testimonials - safe initialization
  testimonials: [...defaultTestimonials],
  
  // Animation
  animationEnabled: true,
  toggleAnimation: () => set((state) => ({ animationEnabled: !state.animationEnabled }))
}))
