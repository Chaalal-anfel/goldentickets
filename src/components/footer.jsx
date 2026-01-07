import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <footer ref={ref} className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.03 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          <motion.div variants={childVariant}>
            <div className="flex flex-col mb-6 gap-4">
              <div className="h-32 w-48">
                <img
                  src="logo-white.png"
                  alt="Golden Ticket Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="mb-0 text-gray-300 max-w-xs">
                Your one-stop solution for all your travel needs. We specialize in creating memorable travel experiences
                tailored to your preferences.
              </p>
            </div>
          </motion.div>

          <motion.div variants={childVariant}>
            <h3 className="text-white text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Destinations", "Contact Us", "FAQs"].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="hover:text-golden-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={childVariant}>
            <h3 className="text-white text-lg font-medium mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Flight Booking",
                "Hotel Reservations",
                "Tour Packages",
                "Cruise Deals",
                "Car Rentals",
                "Travel Insurance",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="hover:text-golden-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={childVariant}>
            <h3 className="text-white text-lg font-medium mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <MapPin className="h-5 w-5 text-golden-400 mr-3 mt-1" />
                <span>123 Travel Street, City Name, Country</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center"
              >
                <Phone className="h-5 w-5 text-golden-400 mr-3" />
                <span>964 750 454 7323</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center"
              >
                <Mail className="h-5 w-5 text-golden-400 mr-3" />
                <span>info@goldentkts.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-gray-800 pt-8 mt-8 text-center text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Golden Ticket. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
