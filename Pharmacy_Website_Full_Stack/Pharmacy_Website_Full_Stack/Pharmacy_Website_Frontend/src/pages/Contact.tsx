
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Mail, Phone, MapPin, Clock, Send, MessageCircle} from 'lucide-react'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent successfully! We\'ll get back to you soon.', {
      style: {
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        border: '1px solid rgba(102, 126, 234, 0.3)'
      }
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: '24/7 Support',
      details: '+1 (555) 123-CARE',
      description: 'Emergency pharmaceutical assistance'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@pharmacare.com',
      description: 'Get help within 2 hours'
    },
    {
      icon: MapPin,
      title: 'Main Location',
      details: '123 Health Street, Medical District',
      description: 'New York, NY 10001'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Sun: 24/7',
      description: 'Always here when you need us'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to help with all your pharmaceutical needs. Reach out anytime!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-dark rounded-3xl p-8 text-center hover-glow"
              >
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold gradient-text mb-3">{info.title}</h3>
                <p className="text-white font-medium mb-2">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-dark rounded-3xl p-8 hover-glow">
                <h2 className="text-3xl font-bold gradient-text mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/25 neon-glow transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Location & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="glass-dark rounded-3xl p-8 hover-glow">
                <h3 className="text-2xl font-bold gradient-text mb-6">Our Location</h3>
                <div className="w-full h-64 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-300">Interactive Map</p>
                    <p className="text-gray-500 text-sm">123 Health Street, Medical District</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Main Pharmacy</p>
                      <p className="text-gray-400 text-sm">123 Health Street, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">24/7 Service</p>
                      <p className="text-gray-400 text-sm">Always open for emergencies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="glass-dark rounded-3xl p-8 hover-glow">
                <h3 className="text-2xl font-bold gradient-text mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <Phone className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Call Now</p>
                      <p className="text-gray-400">+1 (555) 123-CARE</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:support@pharmacare.com"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <Mail className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Email Us</p>
                      <p className="text-gray-400">support@pharmacare.com</p>
                    </div>
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-purple-500/10 transition-all duration-300 w-full"
                  >
                    <MessageCircle className="w-6 h-6 text-purple-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">Live Chat</p>
                      <p className="text-gray-400">Start conversation</p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Emergency Support</h2>
            <p className="text-xl text-gray-300 mb-8">
              For urgent pharmaceutical needs or emergencies, contact us immediately
            </p>
            <motion.a
              href="tel:911"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            >
              <Phone className="w-6 h-6" />
              <span>Emergency Hotline: 911</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
