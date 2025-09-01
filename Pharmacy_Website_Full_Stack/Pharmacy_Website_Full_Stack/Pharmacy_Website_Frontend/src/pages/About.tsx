
import React from 'react'
import { motion } from 'framer-motion'
import {Heart, Shield, Award, Users, Clock, Globe} from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Globe, label: 'Countries Served', value: '25+' },
    { icon: Heart, label: 'Lives Improved', value: '1M+' }
  ]

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Pharmacist',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg',
      description: 'Leading pharmaceutical expert with 20+ years experience'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Clinical Director',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
      description: 'Specialized in clinical pharmacy and patient care'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Research Director',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      description: 'Pioneer in pharmaceutical research and development'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Quality Assurance',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      description: 'Ensuring highest quality standards in all products'
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
              About PharmaCare
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing healthcare through innovative pharmaceutical solutions and compassionate care. 
              We're dedicated to improving lives, one prescription at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                At PharmaCare, we believe healthcare should be accessible, affordable, and exceptional. 
                Our mission is to bridge the gap between cutting-edge pharmaceutical innovation and 
                personalized patient care.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Ensuring medication safety and quality' },
                  { icon: Heart, text: 'Compassionate care for every patient' },
                  { icon: Award, text: 'Excellence in pharmaceutical services' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 glass-dark rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-dark rounded-3xl p-8 hover-glow">
                <img
                  src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg"
                  alt="Pharmacy Excellence"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-2xl font-bold gradient-text mb-4">15+ Years of Excellence</h3>
                <p className="text-gray-300">
                  Since 2008, we've been at the forefront of pharmaceutical innovation, 
                  serving millions of customers worldwide with unwavering commitment to quality and care.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300">Making a difference in healthcare worldwide</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-dark rounded-3xl p-8 text-center hover-glow"
              >
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300">Expert professionals dedicated to your health</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-dark rounded-3xl overflow-hidden hover-glow"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Constantly pushing boundaries to bring you the latest in pharmaceutical technology',
                icon: '🚀'
              },
              {
                title: 'Trust',
                description: 'Building lasting relationships through transparency, reliability, and ethical practices',
                icon: '🤝'
              },
              {
                title: 'Excellence',
                description: 'Maintaining the highest standards in every aspect of our service and products',
                icon: '⭐'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-dark rounded-3xl p-8 text-center hover-glow"
              >
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold gradient-text mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
