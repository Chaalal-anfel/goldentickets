import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

const HeroSection = () => {
  const videoRef = useRef(null)
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Floating animation for the CTA button
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  // Play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/BG.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content with animations */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm md:text-base uppercase tracking-widest mb-4">YOUR ONE-STEP</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 max-w-4xl">
            <span className="block">FOR EVERYTHING IN</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="block bg-clip-text text-transparent text-golden-400"
            >
              TRAVEL AND TOURISM
            </motion.span>
          </h1>
        </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="bg-golden-400 text-white border-golden-400 hover:bg-golden-400/90 px-8 py-6 text-sm rounded-full transition-all duration-300"
            >
            GOLDEN TICKET WE LOVE THE SKY
            </Button>
          </motion.div>



      </div>
    </section>
  )
}

export default HeroSection
