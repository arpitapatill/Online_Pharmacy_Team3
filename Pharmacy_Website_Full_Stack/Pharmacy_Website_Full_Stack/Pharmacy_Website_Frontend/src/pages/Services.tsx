
import React from 'react'
import { motion } from 'framer-motion'
import {Pill, Stethoscope, Truck, Clock, Shield, Users, Heart, Phone} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Pill,
      title: 'Prescription Services',
      description: 'Expert prescription filling with quality assurance and safety checks',
      features: ['Digital prescriptions', 'Insurance processing', 'Generic alternatives', 'Refill reminders'],
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Stethoscope,
      title: 'Health Consultations',
      description: 'Professional health advice from certified pharmacists and healthcare experts',
      features: ['Medication reviews', 'Health screenings', 'Vaccination services', 'Chronic care management'],
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: Truck,
      title: 'Home Delivery',
      description: 'Fast and secure delivery of medications right to your doorstep',
      features: ['Same-day delivery', 'Temperature controlled', 'Secure packaging', 'Real-time tracking'],
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency pharmaceutical services when you need them most',
      features: ['Emergency prescriptions', 'After-hours support', 'Critical medications', 'Urgent consultations'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Insurance Support',
      description: 'Comprehensive insurance processing and coverage optimization',
      features: ['All major insurances', 'Prior authorizations', 'Coverage verification', 'Cost optimization'],
      color: 'from-indigo-600 to-blue-600'
    },
    {
      icon: Users,
      title: 'Family Care',
      description: 'Specialized care programs for families and chronic conditions',
      features: ['Pediatric care', 'Senior programs', 'Family profiles', 'Care coordination'],
      color: 'from-pink-600 to-rose-600'
    }
  ]

  const specialPrograms = [
    {
      title: 'Diabetes Care Program',
      description: 'Comprehensive diabetes management with monitoring and education',
      icon: '🩺',
      benefits: ['Blood glucose monitoring', 'Insulin management', 'Nutritional counseling', 'Regular check-ups']
    },
    {
      title: 'Heart Health Initiative',
      description: 'Cardiovascular health support and medication management',
      icon: '❤️',
      benefits: ['Blood pressure monitoring', 'Cholesterol management', 'Lifestyle counseling', 'Medication optimization']
    },
    {
      title: 'Mental Wellness Support',
      description: 'Mental health medication management and support services',
      icon: '🧠',
      benefits: ['Medication adherence', 'Side effect monitoring', 'Counseling referrals', 'Crisis support']
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
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Comprehensive pharmaceutical services designed to meet all your health and wellness needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Core Services</h2>
            <p className="text-xl text-gray-300">Everything you need for optimal health management</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-dark rounded-3xl p-8 hover-glow"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold gradient-text mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Specialized Programs</h2>
            <p className="text-xl text-gray-300">Targeted care for specific health conditions</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {specialPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-dark rounded-3xl p-8 hover-glow"
              >
                <div className="text-6xl mb-6 text-center">{program.icon}</div>
                <h3 className="text-2xl font-bold gradient-text mb-4 text-center">{program.title}</h3>
                <p className="text-gray-300 mb-6 text-center">{program.description}</p>
                
                <div className="space-y-3">
                  {program.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-gray-400 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">How It Works</h2>
            <p className="text-xl text-gray-300">Simple steps to get the care you need</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Schedule a consultation with our experts' },
              { step: '02', title: 'Assessment', description: 'Comprehensive health and medication review' },
              { step: '03', title: 'Treatment Plan', description: 'Personalized care plan development' },
              { step: '04', title: 'Ongoing Support', description: 'Continuous monitoring and support' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 glass-dark rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold gradient-text">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the difference of personalized pharmaceutical care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/25 neon-glow transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>Schedule Consultation</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 px-8 py-4 glass border border-purple-500 text-purple-400 rounded-2xl font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                <span>Learn More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
