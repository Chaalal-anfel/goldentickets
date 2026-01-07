import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Instagram, Facebook, Phone, X } from "lucide-react"

const CtaSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-golden-100 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-golden-400 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
      </motion.div>

      <div className="container mx-auto text-center relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-black md:text-4xl mb-6">
            Ready to Start Your Journey?
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            Let us help you plan your perfect trip. Contact our travel experts
            today and embark on an unforgettable adventure.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-6 justify-center"
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/213XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center
                       bg-golden-400 text-white rounded-full
                       hover:bg-golden-400/90 transition-all duration-300"
          >
            <Phone className="w-6 h-6" />
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center
                       bg-golden-400 text-white rounded-full
                       hover:bg-golden-400/90 transition-all duration-300"
          >
            <Instagram className="w-6 h-6" />
          </motion.a>

          {/* Facebook */}
          <motion.a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center
                       bg-golden-400 text-white rounded-full
                       hover:bg-golden-400/90 transition-all duration-300"
          >
            <Facebook className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://x.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center
                       bg-golden-400 text-white rounded-full
                       hover:bg-golden-400/90 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
