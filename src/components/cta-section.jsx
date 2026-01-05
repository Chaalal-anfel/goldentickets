import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const CtaSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 px-4 bg-lightbrown text-white relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-black md:text-4xl mb-6">Ready to Start Your Journey?</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            Let us help you plan your perfect trip. Contact our travel experts today and embark on an unforgettable
            adventure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="bg-golden-400 text-white border-golden-400 hover:bg-golden-400/90 px-8 py-6 text-sm rounded-full transition-all duration-300"
            >
              CONTACT US NOW
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="bg-transparent text-gray-500 border-golden-400 hover:bg-white/10 px-8 py-6 text-sm rounded-full transition-all duration-300"
            >
              EXPLORE PACKAGES
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
