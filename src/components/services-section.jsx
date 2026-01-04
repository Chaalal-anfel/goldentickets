import { Plane, Hotel, Map, CreditCard, Headphones, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Book flights to any destination worldwide with our easy-to-use booking system.",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Find and book accommodations that suit your preferences and budget.",
  },
  {
    icon: Map,
    title: "Tour Packages",
    description: "Explore our carefully curated tour packages for unforgettable experiences.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Enjoy peace of mind with our secure and flexible payment options.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you.",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Protect your journey with comprehensive travel insurance coverage.",
  },
]

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of travel services to make your journey seamless and memorable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              className="bg-white p-8 rounded-lg shadow-sm transition-all duration-300 border border-gray-100"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className="mb-4 text-golden-400"
              >
                <service.icon size={40} />
              </motion.div>
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
